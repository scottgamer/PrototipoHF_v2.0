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

//response schema
const ResponseSchema = mongoose.Schema({
    response: String,
    date: String,
    author: String,
});

//question schema
const QuestionSchema = mongoose.Schema({
    question: String,
    date: String,
    author: String,
    responses: [ResponseSchema]
});

//event schema
const EventSchema = mongoose.Schema({
    name: String,
    date: String,
    organizedBy: String,
    organizerImg: String,
    description: String,
    img: String,
});

//application schema
const ApplicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
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
    commentaries: [CommentarySchema],
    downloadedTimes: Number
});

//user schema
const UserSchema = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: String,
    genre: String,
    nationality: String,
    bio: String,
    downloadedApps: [ApplicationSchema],
    questionsMade: [QuestionSchema],
    responsesMade: [ResponseSchema],
    savedEvents: [EventSchema]
});

const User = module.exports = mongoose.model('User', UserSchema);

//functions

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
};

module.exports.updateUserPassword = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback)=> {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
};

module.exports.updateUser = (callback) => {
    let id = req.params._id;
    let query = {_id:id};

    User.findOne(query, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!user) {
                res.status(404).send();
            } else {
                if (req.body.fullName) {
                    user.fullName = req.body.fullName;
                }

                user.save((err, updatedUser) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        res.send(updatedUser);
                    }
                });
            }
        }

    });

};