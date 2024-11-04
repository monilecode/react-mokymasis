const { categories } = require("../mock-categories");

function createCategory(req, res) {
  const newId = categories.length + 1;
  categories.push({
    id: newId,
    category: req.body.category,
    icon: req.body.icon,
    alt: req.body.alt,
  });

  res.json({
    success: true,
    message: "Category added successfully",
    categoryId: newId,
  });
}

module.exports = {
  createCategory,
};
