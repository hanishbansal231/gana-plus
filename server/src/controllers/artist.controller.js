import Artist from "../models/artist.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
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
};

export const getAllArtists = async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.status(201).json(
            new ApiResponse(200, artists, "Artists fetched successfully")
        )
    } catch (error) {
        return next(new ApiError(501, "failed to get all artists"));
    }
};

//get by id;

export const getArtistById = async (req, res, next) => {
    const { aid } = req.params;
    console.log(aid)
    if (!aid) {
        return next(new ApiError(402), "Invalid artist id")
    }
    try {
        const artist = await Artist.findById(aid);
        res.status(201).json(
            new ApiResponse(200, artist, "Artist fetched successfully")
        )
    } catch (error) {
        return next(new ApiError(501, "failed to get artist"));
    }
};

export const updateArtist = async (req, res, next) => {
    try {
        const { name, bio, genres } = req.body;
        console.log(name, bio, genres)
        const { aid } = req.params;
        if (!aid) {
            return next(new ApiError(402), "Invalid artist id")
        }
        const artist = await Artist.findById(aid);
        const updatedArtist = await Artist.findByIdAndUpdate(aid, {
            name: name || artist.name,
            bio: bio || artist.bio,
            genres: genres || artist.genres,
        }, { new: true });
        console.log(updatedArtist)
        res.status(201).json(
            new ApiResponse(200, updatedArtist, "Artist updated successfully")
        )
    } catch (error) {
        return next(new ApiError(501, "failed to update artist"));
    }
}