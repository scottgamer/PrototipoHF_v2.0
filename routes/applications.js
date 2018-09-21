const express = require('express');
const router = express.Router();

//load application model
const Application = require('../models/application');
const Commentary = require('../models/commentary');

//add new application
router.post('/add', (req, res, next) => {
    let newApplication = new Application({
        //username: req.body.username,
        name: req.body.name,
        logo: req.body.logo,
        imgs: req.body.imgs,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        country: req.body.country,
        developedBy: req.body.developedBy,
        version: req.body.version,
        releaseDate: req.body.releaseDate,
        platform: req.body.platform,
        androidMin: req.body.androidMin,
        appWebPage: req.body.appWebPage,
        commentaries: [],
        downloadedTimes: req.body.downloadedTimes,
    });

    Application.addApplication(newApplication, (err, app) => {
        if (err) res.json({ success: false, msg: 'Failed to add new application ' + err });
        else res.json({ success: true, msg: 'Application added' });
    });

});

//get all applications
router.get('/getapps', (req, res, next) => {
    Application.getApplications((err, apps) => {
        if (err) throw err;
        res.json(apps);
    });
});

//get all applications by category
router.get('/getappsbycategory/:_id', (req, res, next) => {
    let categoryId = req.params._id;
    Application.getApplicationsByCategoryId(categoryId, (err, apps) => {
        if (err) {
            res.send(status);
            console.log(err);
            throw err;
        }
        res.json(apps);
    });
});

//get application by id
router.get('/getone/:_id', (req, res, next) => {
    let appId = req.params._id;
    Application.getApplicationById(appId, (err, app) => {
        if (err) {
            res.send(status);
            console.log(err);
            throw err;
        }
        res.json(app);
    });
});

//get latest applications
router.get('/getlatest', (req, res, next) => {
    Application.getLatestApplications((err, apps) => {
        if (err) {
            res.send(status);
            console.log(err);
            throw err;
        }
        res.json(apps);
    });
});

//post new commentary
router.post('/newcommentary/:_id', (req, res, next) => {
    let appId = req.params._id;
    let commentary = new Commentary({
        user: req.body.user,
        commentary: req.body.commentary,
        rating: req.body.rating
    });
    Commentary.addCommentary(commentary, (err, success) => {
        if (err) res.json({ success: false, msg: '0 ' + err });
        else {
            Commentary.getLatestCommentary((err, comment) => {
                if (err) res.json({ success: false, msg: '1 ' + err });
                let commentId = comment._id;
                Application.postNewCommentaryById(appId, commentId, (err, app) => {
                    if (err) res.json({ success: false, msg: '2 ' + err });
                    res.json({ success: true, msg: 'Commentary added' });
                });
            });
        }
    });

});

module.exports = router;