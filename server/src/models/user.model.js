import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    tokens: [String],
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    this.tokens.push(token);
    return token;
};

const User = model('User', userSchema);

module.exports = User;
