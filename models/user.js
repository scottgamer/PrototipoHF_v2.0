const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    downloadedApps: [{
        type: mongoose.Schema.Types.String,
        ref: 'Application'
    }],
    questionsMade: [{
        type: mongoose.Schema.Types.String,
        ref: 'Question'
    }],
    responsesMade: [{
        type: mongoose.Schema.Types.String,
        ref: 'Response'
    }],
    savedEvents: [{
        type: mongoose.Schema.Types.String,
        ref: 'Event'
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

//functions

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
};

/* module.exports.updateUserPassword = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}; */

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
};

module.exports.updateUser = (query, req, res, callback) => {
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
                if (req.body.password) {
                    user.password = req.body.password;
                }
                if (req.body.birthday) {
                    user.birthday = req.body.birthday;
                }
                if (req.body.genre) {
                    user.genre = req.body.genre;
                }
                if (req.body.nationality) {
                    user.nationality = req.body.nationality;
                }
                if (req.body.bio) {
                    user.bio = req.body.bio;
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

module.exports.addAppToDownloadedList = (userId, appId, callback) => {
    const query = { _id: userId };
    const app = { $push: { downloadedApps: appId } };
    User.findOneAndUpdate(query, app, callback);
};

module.exports.addEventToEventList = (userId, eventId, callback) => {
    const query = { _id: userId };
    const event = { $push: { savedEvents: eventId } };
    User.findOneAndUpdate(query, event, callback);
};