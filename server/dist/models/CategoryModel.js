"use strict";
const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
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
const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = { CategoryModel };
