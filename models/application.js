const mongoose = require('mongoose');

//load commentary model
const Commentary = require('../models/commentary');

const ApplicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo:String,
    imgs: [String],
    category: String,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commentary'
        }],
    downloadedTimes: Number
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
    const query = {category:categoryId};
    Application.find(query, callback);
} 
