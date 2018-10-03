const mongoose = require('mongoose');

//load commentary model
const Commentary = require('../models/commentary');

const ApplicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: String,
  logoAlt: String,
  imgs: [String],
  category: {
    type: mongoose.Schema.Types.String,
    ref: 'Category'
  },
  description: String,
  rating: Number,
  ratingCount: Number,
  country: String,
  developedBy: String,
  version: String,
  releaseDate: String,
  platform: String,
  androidMin: String,
  appWebPage: String,
  commentaries: [
    {
      type: mongoose.Schema.Types.String,
      ref: 'Commentary'
    }],
  questions: [{
    type: mongoose.Schema.Types.String,
    ref: 'Question'
  }],
  downloadedTimes: Number,
  create_date: {
    type: Date,
    default: Date.now
  },
});

const Application = module.exports = mongoose.model('Application', ApplicationSchema);


//functions

module.exports.addApplication = (newApplication, callback) => {
  newApplication.save(callback);
};

module.exports.getApplications = (callback, limit) => {
  Application.find(callback).limit(limit);
};

module.exports.getApplicationsByCategoryId = (categoryId, callback) => {
  const query = { category: categoryId };
  Application.find(query, callback);
}

module.exports.getApplicationById = (appId, callback) => {
  const query = { _id: appId };
  Application.findOne(query, callback);
}
module.exports.getLatestApplication = (callback) => {
  Application.findOne().sort({ create_date: -1 }).exec(callback);
}

module.exports.getLatestApplications = (callback) => {
  Application.find().sort({ create_date: -1 }).exec(callback);
}

module.exports.postNewCommentaryById = (appId, commentId, callback) => {
  const query = { _id: appId };
  const comment = { $push: { commentaries: commentId } };
  const quantity = { $inc: { ratingCount: 1 } };

  Application.findOneAndUpdate(query, comment, callback);
}

module.exports.postNewQuestionById = (appId, questionId, callback) => {
  const query = { _id: appId };
  const question = { $push: { questions: questionId } };
  Application.findOneAndUpdate(query, question, callback);
}

module.exports.postNewRating = (appId, newRating, callback) => {
  const id = { _id: appId };
  const query = { $set: { rating: newRating } };
  Application.findOneAndUpdate(id, query, callback);
}

module.exports.incrementRatingCount = (appId, callback) => {
  const id = { _id: appId };
  const query = { $inc: { ratingCount: 1 } };
  Application.findOneAndUpdate(id, query, callback);
}

module.exports.getActualRating = (appId, callback) => {
  Application.findById(appId, 'rating', callback);
}

module.exports.getActualRatingCount = (appId, callback) => {
  Application.findById(appId, 'ratingCount', callback);
}

module.exports.getBestRated = (callback) => {
  Application.find().sort({ rating: -1 }).exec(callback);
};

/* db.students.update(
    { _id: 1 },
    { $push: { scores: 89 } } )*/


