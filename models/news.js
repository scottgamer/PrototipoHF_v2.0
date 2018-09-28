const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    body: String,
    imgs: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

const News = module.exports = mongoose.model('New', NewsSchema);

//functions

module.exports.addNew = (newNew, callback) => {
    newNew.save(callback);
};

module.exports.getNewById = (id, callback) => {
    News.findById(id, callback);
};

module.exports.getNews = (callback, limit) => {
    News.find(callback).limit(limit);
};