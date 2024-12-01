"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceSchema = new mongoose_1.default.Schema({
    heading: {
        type: String,
        required: true,
    },
    images: [{ url: { type: String, required: true } }],
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    categoryTag: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bookings: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
});
ServiceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const ServiceModel = mongoose_1.default.model('Service', ServiceSchema);
exports.ServiceModel = ServiceModel;
