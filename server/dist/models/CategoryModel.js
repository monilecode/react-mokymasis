"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
});
CategorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const CategoryModel = mongoose_1.default.model('Category', CategorySchema);
exports.CategoryModel = CategoryModel;
