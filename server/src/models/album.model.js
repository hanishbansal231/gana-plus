import { Schema, model } from 'mongoose';

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    coverImageUrl: String,
    genre: [String],
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
}, { timestamps: true });

const Album = model('Album', albumSchema);

module.exports = Album;
