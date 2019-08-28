const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/getall', categoryController.getCategories);
router.get('/getone/:_id', categoryController.getCategoryById);

module.exports = router;