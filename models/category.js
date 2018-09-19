const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:String,
    url:String,
    children:[{
        name:String,
        url:String,
    }]
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

//functions
module.exports.getCategories = (callback, limit)=>{
    Category.find(callback).limit(limit);
}

module.exports.getCategoryById = (categoryId, callback) => {
    Category.findById(categoryId, callback);
};

