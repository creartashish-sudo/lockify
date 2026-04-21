const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
     photo: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Document', documentSchema);