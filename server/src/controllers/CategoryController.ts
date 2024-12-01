import { CategoryModel } from '../models/CategoryModel';
import { Request, Response } from 'express';

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const allCategories = await CategoryModel.find();
    res.json(allCategories);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories' });
    return;
  }
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCategory = new CategoryModel({
      category: req.body.category,
      icon: req.body.icon,
      alt: req.body.alt,
    });
    await newCategory.save();
    res.json({
      success: true,
      message: 'Category added successfully',
      categoryId: newCategory._id,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
    return;
  }
};

export { getCategories, createCategory };
