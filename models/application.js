const mongoose = require('mongoose');

//load commentary model
const Commentary = require('../models/commentary');

const ApplicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String,
    imgs: [String],
    category: {
        type: mongoose.Schema.Types.String,
        ref:'Category'
    },
    description: String,
    rating: Number,
    country: String,
    developedBy: String,
    version: Number,
    releaseDate: String,
    platform: String,
    androidMin: String,
    appWebPage: String,
    commentaries: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'Commentary'
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
module.exports.getLatestApplications = (callback) => {
    Application.findOne().sort({ create_date: -1 }).exec(callback);
}

module.exports.postNewCommentaryById = (appId, commentId, callback) => {
    const query = { _id: appId };
    const comment = { $push: { commentaries: commentId  } };
    Application.findOneAndUpdate(query, comment, callback);
}

/* db.students.update(
    { _id: 1 },
    { $push: { scores: 89 } } )*/
 

