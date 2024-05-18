import { Schema, model } from 'mongoose';

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
}, { timestamps: true });

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
