"use strict";
const express = require('express');
const { getCategories, createCategory } = require('../controllers/CategoryController');
const CategoryRoutes = express.Router();
CategoryRoutes.get('/', getCategories);
CategoryRoutes.post('/', createCategory);
module.exports = { CategoryRoutes };
