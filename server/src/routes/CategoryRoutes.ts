import express from 'express';
import { getCategories, createCategory } from '../controllers/CategoryController';

const CategoryRoutes = express.Router();

CategoryRoutes.get('/', getCategories);
CategoryRoutes.post('/', createCategory);

export { CategoryRoutes };
