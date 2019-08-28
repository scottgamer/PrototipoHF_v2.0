const categoryRepository = require('../repositories/categoryRepository');

exports.getCategories = async (req, res) => {
  try {
    const response = await categoryRepository.getCategories();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await categoryRepository.getCategory(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};