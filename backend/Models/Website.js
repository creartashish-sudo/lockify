const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
    website_name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("website", websiteSchema);