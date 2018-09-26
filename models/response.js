const mongoose = require('mongoose');

const ResponseSchema = mongoose.Schema({
    response: String,
    date: String,
    user: {
        type: mongoose.Schema.Types.String,
        ref:'User'
    },
});

const Response = module.exports = mongoose.model('Response', ResponseSchema);