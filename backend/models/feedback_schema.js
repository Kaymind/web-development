const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    username: {type: String, required: true}, 
    message: String,
    category: {type: String, default: "general"},
    crated: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('feedbacks', feedbackSchema);