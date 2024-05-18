const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: String,
    genres: [String],
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album',
    }],
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
