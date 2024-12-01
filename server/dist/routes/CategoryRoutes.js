"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const CategoryRoutes = express_1.default.Router();
exports.CategoryRoutes = CategoryRoutes;
CategoryRoutes.get('/', CategoryController_1.getCategories);
CategoryRoutes.post('/', CategoryController_1.createCategory);
