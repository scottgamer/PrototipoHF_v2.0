const express = require('express');
const router = express.Router();

const Question = require('../models/question');

//add new question
router.post('/add', (req, res, next) => {
    let newQuestion = new Question({
        question: req.body.question,
        user: req.body.user,
        application: req.body.application,
        responses: []
    });

    Question.addQuestion(newQuestion, (err, q) => {
        if (err) res.json({ success: false, msg: 'Failed to post new question' + err });
        else res.json({ success: true, msg: 'Question added' });
    });

});

//get all questions by application
router.get('/getquestions/byappid/:_id', (req, res, next) => {
    let appId = req.params._id;
    let query = {application:appId};
    Question.getQuestionById(query, (err, questions) => {
        if (err) throw err;
        res.json(questions);
    });
});

//get all questions by user
router.get('/getquestions/byuserid/:_id', (req, res, next) => {
    let userId = req.params._id;
    let query = {user:userId};
    Question.getQuestionById(query, (err, questions) => {
        if (err) throw err;
        res.json(questions);
    });
});

module.exports = router;