import { Schema, model } from 'mongoose';

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

const Artist = model('Artist', artistSchema);

module.exports = Artist;
