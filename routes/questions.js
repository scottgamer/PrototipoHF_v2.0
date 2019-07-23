const express = require('express');
const router = express.Router();

const Question = require('../models/question');
const User = require('../models/user');
const Application = require('../models/application');

//add new question
router.post('/add', (req, res, next) => {
  let userId = req.body.user;
  let appId = req.body.application;
  let newQuestion = new Question({
    question: req.body.question,
    user: userId,
    application: appId,
    responses: []
  });

  Question.addQuestion(newQuestion, (err, q) => {
    if (err) res.json({ success: false, msg: 'Failed to post new question' + err });
    else {
      Question.getLatestQuestion((err, question) => {
        if (err) res.json({ success: false, msg: 'Failed to get latest question ' + err });
        let questionId = question._id;
        User.addQuestionToQuestionList(userId, questionId, (err, question) => {
          if (err) throw err;
          Application.postNewQuestionById(appId, questionId, (err, question) => {
            if (err) throw err;
            res.json({ success: true, msg: 'Question added to application and user' });
          });

        });

      });
    }
  });

});

//get all questions by application
router.get('/getquestions/byappid/:_id', (req, res, next) => {
  let appId = req.params._id;
  let query = { application: appId };
  Question.getQuestions(query, (err, questions) => {
    if (err) throw err;
    res.json(questions);
  });
});

//get all questions by user
router.get('/getquestions/byuserid/:_id', (req, res, next) => {
  let userId = req.params._id;
  let query = { user: userId };
  Question.getQuestions(query, (err, questions) => {
    if (err) throw err;
    res.json(questions);
  });
});

//put response to question
router.put('/putresponsetoquestionbyid/:_id', (req, res, next) => {
  let questionId = req.params._id;
  let queryId = { _id: questionId };
  let query = {
    $push: {
      responses: {
        response: req.body.response,
        user: req.body.user
      }
    }
  };
  Question.addResponse(queryId, query, (err, response) => {
    if (err) throw err;
    res.json('Success');
  });

});

module.exports = router;