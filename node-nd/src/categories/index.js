const express = require("express");
const { getCategories } = require("./queries/get-categories");
const { createCategory } = require("./mutations/create-category");

const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);

module.exports = {
  categoriesRouter,
};
