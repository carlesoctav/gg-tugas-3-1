const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        minlength: 1,
    },
    albums: {
        type: Array,
        required: true,
    }
})


module.exports = mongoose.model('Artist', artistSchema)
