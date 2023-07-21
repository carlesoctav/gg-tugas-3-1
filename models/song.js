const mongoose = require('mongoose');

const Song = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },

    artist: {
        type: String,
        ref: 'Artist',
    },
    playCount: {
        type: Number,
        required: true,
    },
});



module.exports = mongoose.model('Song', Song)


