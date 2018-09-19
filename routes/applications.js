const express = require('express');
const router = express.Router();

//load application model
const Application = require('../models/application');

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
        version:req.body.version,
        releaseDate: req.body.releaseDate,
        platform: req.body.platform,
        androidMin: req.body.androidMin,
        appWebPage: req.body.appWebPage,
        commentaries: null,
        downloadedTimes: null,
    });

    Application.addApplication(newApplication, (err, app)=>{
        if (err) res.json({ success: false, msg: 'Failed to add new application' });
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

router.get('/getappsbycategory/:_id',(req, res, next)=>{
    let categoryId = req.params._id;
    Application.getApplicationsByCategoryId((categoryId), (err, apps)=>{
        if(err) {
            res.send(404);
            console.log(err);
            throw err;
        }
        res.json(apps);
    });

});

module.exports=router;