const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Application = require('../models/application');
const Events = require('../models/events');
const Question = require('../models/question');

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
    downloadedApps: [],
    questionsMade: [],
    responsesMade: [],
    savedEvents: []
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
      return res.json({ success: false, msg: 'User not found' });
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

//Get user by id
router.get('/getone/:_id', (req, res, next) => {
  let userId = req.params._id;
  User.getUserById(userId, (err, user) => {
    if (err) res.json({ success: false, msg: '0 ' + err });
    res.json(user);
  });
});

//Update user data
router.put('/update/:_id', (req, res, next) => {
  let id = req.params._id;
  let query = { _id: id };

  User.updateUser(query, req, res, err => {
    if (err) throw err;
    res.send('Success');
  });
});

//Add application to user downloaded apps
router.put('/adddownloadedapplication/:_id', (req, res, next) => {
  let appId = req.params._id;
  let userId = req.body.user;
  User.addAppToDownloadedList(userId, appId, (err, user) => {
    if (err) throw err;
    res.send('Success');
  });
});

//Get downloaded apps
router.get('/getuserapp/:_id', (req, res, next) => {
  let appId = req.params._id;
  Application.getApplicationById(appId, (err, app) => {
    if (err) throw err;
    res.json(app);
  });
});

//Add event to saved events list
router.put('/addsavedevent/:_id', (req, res, next) => {
  let eventId = req.params._id;
  let userId = req.body.user;
  User.addEventToEventList(userId, eventId, (err, user) => {
    if (err) res.json({ success: false, msg: 'err ' + err });
    res.send('Success');
  });
});

//Get saved events
router.get('/getuserevent/:_id', (req, res, next) => {
  let eventId = req.params._id;
  Events.getEventById(eventId, (err, event) => {
    if (err) throw err;
    res.json(event);
  });
});

//Get questions made
router.get('/getuserquestion/:_id', (req, res, next) => {
  let questionId = req.params._id;
  Question.getQuestionById(questionId, (err, question) => {
    if (err) throw err;
    res.json(question);
  });
});

module.exports = router;
