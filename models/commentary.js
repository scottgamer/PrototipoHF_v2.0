const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//commentary schema
const CommentarySchema = mongoose.Schema({
    user: String,
    commentary: String,
    date: String,
    rating: Number
});

const Commentary = module.exports = mongoose.model('Commentary', CommentarySchema); 