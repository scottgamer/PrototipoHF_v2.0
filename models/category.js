const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: String,
  url: String,
  children: [{
    name: String,
    url: String,
  }]
});

const Category = mongoose.model('Category', CategorySchema);

exports.getCategories = (callback, limit) => {
  Category.find(callback).limit(limit);
};

exports.getCategoryById = (categoryId, callback) => {
  Category.findById(categoryId, callback);
};

module.exports = Category;

