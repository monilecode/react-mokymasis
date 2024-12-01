"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BookingController_1 = require("../controllers/BookingController");
const BookingRoutes = express_1.default.Router();
exports.BookingRoutes = BookingRoutes;
BookingRoutes.get('/', BookingController_1.getBookings);
BookingRoutes.post('/', BookingController_1.createBooking);
BookingRoutes.get('/user/:userEmail', BookingController_1.getBookingsByEmail);
BookingRoutes.delete('/:id', BookingController_1.deleteBooking);
