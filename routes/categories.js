const express = require('express');
const router = express.Router();

//load category model
const Category = require('../models/category');

//get all categoriess
router.get('/getall', (req, res, next) => {
    Category.getCategories((err, categories) => {
        if (err) throw err;
        res.json(categories);
    });
});

router.get('/getone/:_id', (req, res) => {
    Category.getCategoryById(req.params._id, (err, category) => {
        if (err) {
            res.send(status);
            throw err;
        } 
        res.json(category);
    });
});
module.exports=router;