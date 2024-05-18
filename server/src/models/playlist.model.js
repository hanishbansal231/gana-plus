const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
