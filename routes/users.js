const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//load user model
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fullName: null,
        birthday: null,
        genre: null,
        nationality: null,
        bio: null,
        downloadedApps: null,
        questionsMade: null,
        responsesMade: null,
        savedEvents: null
    });

    User.addUser(newUser, (err, user) => {
        if (err) res.json({ success: false, msg: 'Failed to register user' });
        else res.json({ success: true, msg: 'User registered' });
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    //get username and password being submitted
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                });

            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //send user object
    res.json({ user: req.user });
});

//Update user data
router.put('/update/:_id', (req, res, next) => {
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
                    user.bio= req.body.bio;
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
});

module.exports = router;
