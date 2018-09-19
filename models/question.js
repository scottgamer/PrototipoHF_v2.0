const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    question: String,
    date: String,
    author: String,
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
});

const Question = module.exports = mongoose.model('Question', QuestionSchema);