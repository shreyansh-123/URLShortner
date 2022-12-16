const mongoose = require('mongoose');
const shortUrl = require("shortid");

const register = new mongoose.Schema({
    Full: {
        type: String,
        required: true,
    },
    Short: {
        type: String,
        default: shortUrl.generate()
    },
    Clicks: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Register', register);