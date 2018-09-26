const express = require('express');
const router = express.Router();

const News = require('../models/news');

//add new new
router.post('/add', (req, res, next) => {
    let newNew = new News({
        title: req.body.title,
        body: req.body.body,
        imgs: req.body.imgs
    });

    News.addNew(newNew, (err, new_) => {
        if (err) res.json({ success: false, msg: 'Failed to add new news' + err });
        else res.json({ success: true, msg: 'News added' });
    });

});

//get all news
router.get('/getall', (req, res, next) => {
    News.getNews((err, news) => {
        if (err) throw err;
        res.json(news);
    });
});

//get news by id
router.get('/getone/:_id', (req, res, next) => {
    let newsId = req.params._id;
    News.getNewById(newsId, (err, news) => {
        if (err) throw err;
        res.json(news);
    });
});

module.exports = router;