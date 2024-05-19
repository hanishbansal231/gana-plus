
import authModel from "../models/authModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/cloudinary.js";
import otpGenerator from 'otp-generator';
import OTP from "../models/otpModel.js";
import JWT from 'jsonwebtoken';
import validateEmail from "../utils/emailVerify.js";
import sendEmail from "../utils/sendEmail.js";


export const sendOTP = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            next(new ApiError(403, 'Email is required'));
        }

        const existUser = await authModel.findOne({ email });

        if (existUser) {
            next(new ApiError(403, 'User is already exist,Please try to login'));
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        // console.log(otpBody);

        return res.status(201).json(
            new ApiResponse(200, otpBody, 'OTP send successfully...')
        )

    } catch (Error) {
        console.log(Error.message);
        next(new ApiError(500, Error.message));
    }
});

export const register = asyncHandler(async (req, res, next) => {
    try {

        const { name, username, email, password, otp } = req.body;

        if (!name || !email || !username || password, !otp) {
            return next(new ApiError(400, "All Fields are required"));
        }

        const userExists = await authModel.findOne({
            $or: [{ username, email }]
        });

        if (userExists) {
            return next(new ApiError(400, "Email Already Exists"));
        }

        const response = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.otp.length === 0) {
            return next(new ApiError(400, 'The OTP is not valid'));
        } else if (otp !== response.otp) {
            return next(new ApiError(400, 'The OTP is not valid'));
        }

        const user = await authModel.create({
            name,
            email,
            username,
            password,
            avatar: {
                public_id: "DUMMY",
                secure_url: "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
            }
        })

        let avatarLocalPath;
        if (req.file && req.file.path) {
            avatarLocalPath = req.file.path;
        }

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required");
        }

        const avatar = await uploadCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
        }
        console.log("avatar", avatar)

        user.avatar.public_id = avatar?.public_id || "DUMMY";
        user.avatar.secure_url = avatar?.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

        await user.save();

        return res.status(201).json(
            new ApiResponse(200, user, "User registered Successfully")
        )

    } catch (error) {
        next(new ApiError(500, error.message));
    }
})

export const login = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        if ((!email || !username) || !password) {
            return next(new ApiError(400, "All Fields are required"));
        }

        let user;
        if (validateEmail(email)) user = await authModel.findOne({ email });
        else user = await authModel.findOne({ username });

        if (!user) {
            return next(new ApiError(404, "Email is not registered"));
        }

        const match = await user.camparePassword(password);

        if (!match) {
            return next(new ApiError(404, "Invalid Password"));
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("token", token, {
            secure: true,
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        user.token = token;
        await user.save();

        res.status(201).json(
            new ApiResponse(200, user, "User login Successfully")
        )
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        })

        res.status(201).json(
            new ApiResponse(200, null, "User Logout Successfully")
        )

    } catch (error) {
        next(new ApiError(500, error.message));
    }
}


export const resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await authModel.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await authModel.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        const url = `http://localhost:5173/update-password/${token}`;

        await sendEmail(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (confirmPassword !== password) {
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            });
        }
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid",
            });
        }
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { token: token },
            { password: encryptedPassword },
            { new: true }
        );
        res.json({
            success: true,
            message: `Password Reset Successful`,
        });
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { username, name, email } = req.body;
        const { id } = req.params;
        const user = await authModel.findById(id);

        user.username = username || user.username;
        user.name = name || user.name;
        user.email = email || user.email;

        if (req.file) {
            const avatarLocalPath = req.file.path;

            if (!avatarLocalPath) {
                next(new ApiError(400, "Avatar file is required"));
            }

            const avatar = await uploadCloudinary(avatarLocalPath);

            if (!avatar) {
                next(new ApiError(400, "Avatar file is required"));
            }
            user.avatar.public_id = avatar.public_id;
            user.avatar.secure_url = avatar.secure_url;
        }

        await user.save();

        return res.status(201).json(
            new ApiResponse(200, user, "User updated Successfully")
        )

    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await authModel.findById(id);
        if (!user) {
            next(new ApiError(400, "Error in getting profile"));
        }
        res.status(201).json(
            new ApiResponse(200, user, "User fateched Successfully")
        )
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}
