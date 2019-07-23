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
  application: {
    type: mongoose.Schema.Types.String,
    ref: 'Application'
  },
  responses: [{
    response: String,
    user: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Question = module.exports = mongoose.model('Question', QuestionSchema);

//functions

module.exports.addQuestion = (newQuestion, callback) => {
  newQuestion.save(callback);
};

module.exports.getQuestionById = (id, callback) => {
  Question.findById(id, callback);
};

module.exports.getQuestions = (query, callback, limit) => {
  Question.find(query, callback).limit(limit);
};

module.exports.addResponse = (questionId, query, callback) => {
  Question.updateOne(questionId, query, callback);
};

module.exports.getLatestQuestion = (callback) => {
  Question.findOne().sort({ date: -1 }).exec(callback);
};

