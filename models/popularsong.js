const mongoose = require('mongoose');
const monthYearRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/;
const monthYearType = {
    type: String,
    validate: {
        validator: function(v) {
            return monthYearRegex.test(v);
        },
        message: props => `${props.value} is not a valid month and year string in the format "MMM YYYY"`,
    },
    required: true,
    minlength: 8,
    maxlength: 8,
}

const popularSongSchema = mongoose.Schema({
    period: monthYearType,
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    playCount: {
        type: Number,
        required: true,
    },
})



module.exports = mongoose.model('PopularSong', popularSongSchema)
