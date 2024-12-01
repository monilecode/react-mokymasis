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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.getBookingsByEmail = exports.createBooking = exports.getBookings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookingModel_1 = require("../models/BookingModel");
const ServiceModel_1 = require("../models/ServiceModel");
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield BookingModel_1.BookingModel.find().populate('services').exec();
        res.json(bookings);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings' });
        return;
    }
});
exports.getBookings = getBookings;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userName, services, status, date, time } = req.body;
        const serviceIds = services.map((id) => new mongoose_1.default.Types.ObjectId(id));
        const foundServices = yield ServiceModel_1.ServiceModel.find({ _id: { $in: serviceIds } });
        if (foundServices.length !== serviceIds.length) {
            res.status(404).json({ message: 'One or more services not found' });
            return;
        }
        const newBooking = new BookingModel_1.BookingModel({
            services: serviceIds,
            userEmail,
            userName,
            status,
            date,
            time,
        });
        yield newBooking.save();
        for (const service of foundServices) {
            service.bookings.push(newBooking._id);
            yield service.save();
        }
        res.json({
            success: true,
            message: 'Booking created successfully',
            bookingId: newBooking._id,
        });
        return;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error creating booking', error: errorMessage });
        return;
    }
});
exports.createBooking = createBooking;
const getBookingsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        const bookings = yield BookingModel_1.BookingModel.find({ userEmail }).populate('services').exec();
        if (!bookings.length) {
            res.status(404).json({ message: 'No bookings found for this email' });
            return;
        }
        res.json(bookings);
        return;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error retrieving bookings', error: errorMessage });
        return;
    }
});
exports.getBookingsByEmail = getBookingsByEmail;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BookingModel_1.BookingModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
        return;
    }
});
exports.deleteBooking = deleteBooking;
