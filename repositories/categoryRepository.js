const Category = require('../models/category');

exports.getCategories = () => {
  const promise = new Promise((resolve, reject) => {
    Category.getCategories((err, categories) => {
      if (err) reject(err);
      resolve(categories);
    });
  });
  return promise;
};

exports.getCategory = (id) => {
  const promise = new Promise((resolve, reject) => {
    Category.getCategoryById(id, (error, category) => {
      if (error) reject(error);
      resolve(category);
    });
  });
  return promise;
};