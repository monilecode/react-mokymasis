const { CategoryModel } = require("../models/CategoryModel");

const getCategories = async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();
    res.json(allCategories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new CategoryModel({
      category: req.body.category,
      icon: req.body.icon,
      alt: req.body.alt,
    });
    await newCategory.save();
    res.json({
      success: true,
      message: "Category added successfully",
      categoryId: newCategory._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
