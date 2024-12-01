"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const CategoryModel_1 = require("../models/CategoryModel");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield CategoryModel_1.CategoryModel.find();
        res.json(allCategories);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving categories' });
        return;
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new CategoryModel_1.CategoryModel({
            category: req.body.category,
            icon: req.body.icon,
            alt: req.body.alt,
        });
        yield newCategory.save();
        res.json({
            success: true,
            message: 'Category added successfully',
            categoryId: newCategory._id,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category' });
        return;
    }
});
exports.createCategory = createCategory;
