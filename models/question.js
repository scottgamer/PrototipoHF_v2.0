const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    question: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    application:{
        type: mongoose.Schema.Types.String,
        ref: 'Application'
    },
    responses: [{
        type: mongoose.Schema.Types.String,
        ref: 'Response'
    }]
});

const Question = module.exports = mongoose.model('Question', QuestionSchema);

//functions

module.exports.addQuestion = (newQuestion, callback) => {
    newQuestion.save(callback);
};

module.exports.getQuestionById = (query, callback) => {
    Question.find(query, callback);
};

module.exports.getQuestions = (callback, limit) => {
    Questions.find(callback).limit(limit);
};