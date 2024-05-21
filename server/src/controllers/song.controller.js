import Song from "../models/song.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadCloudinary from "../utils/cloudinary.js";

export const createSong = async (req, res, next) => {
    try {
        const { title, duration, releaseDate, genre, likes, playCount } = req.body;
        if (!title || !duration || !releaseDate) {
            return next(new ApiError(400, "All Fields are required"));
        }
        const song = await Song.create({
            title,
            duration,
            releaseDate,
            genre,
            likes,
            playCount,
            audio: {
                url: "DUMMY",
                public_id: "DUMMY"
            }
        });

        let audioLocalPath;
        if (req.file && req.file.path) {
            audioLocalPath = req.file.path;
        }
        if (!audioLocalPath) {
            throw new ApiError(400, "Audio file is required");
        }
        const audio = await uploadCloudinary(audioLocalPath);
        if (!audio) {
            throw new ApiError(400, "Audio file is required");
        }
        song.audio.public_id = audio?.public_id || "DUMMY";
        song.audio.url = audio?.url || "DUMMY";

        await song.save();

        return res.status(201).json(
            new ApiResponse(200, song, "Song Added Successfully")
        )
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}