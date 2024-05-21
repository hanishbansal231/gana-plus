import { Schema, model } from 'mongoose';

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // duration in seconds
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    genre: [String],
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: false,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: false,
    },
    audio: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    likes: {
        type: Number,
        default: 0,
    },
    playCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Song = model('Song', songSchema);

export default Song;
