const mongoose = require('mongoose');

//commentary schema
const CommentarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    commentary: String,
    date: {
        type: Date,
        default: Date.now
    },
    rating: Number
});

const Commentary = module.exports = mongoose.model('Commentary', CommentarySchema); 

module.exports.addCommentary = (newCommentary, callback) => {
    newCommentary.save(callback);
};

module.exports.getLatestCommentary = (callback) => {
    Commentary.findOne().sort({ create_date: -1 }).exec(callback);
}



