import Artist from "../models/artist.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js"
export const createArtist = async (req, res, next) => {
    try {
        // console.log(req.body)
        const { name, bio, genres } = req.body;
        if (!name) {
            return next(new ApiError(501, "All fileds are required"))
        }
        const artist = await Artist.create({
            name,
            bio,
            genres
        })
        // await artist.save();
        res.status(201).json(
            new ApiResponse(200, artist, "Artist created successfully")
        )
    } catch (error) {
        return next(new ApiError(501, "failed to create artist"))
    }
}