const { categories } = require("../mock-categories");

function getCategories(req, res) {
  res.json(categories);
}

module.exports = {
  getCategories,
};
