const mongoose = require('mongoose');

const ResponseSchema = mongoose.Schema({
    response: String,
    date: String,
    author: String,
});

const Response = module.exports = mongoose.model('Response', ResponseSchema);