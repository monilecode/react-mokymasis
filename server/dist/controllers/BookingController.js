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
const mongoose = require('mongoose');
const { BookingModel } = require('../models/BookingModel');
const { ServiceModel } = require('../models/ServiceModel');
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield BookingModel.find().populate('services').exec();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings' });
    }
});
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userName, services, status, date, time } = req.body;
        const serviceIds = services.map((id) => new mongoose.Types.ObjectId(id));
        const foundServices = yield ServiceModel.find({ _id: { $in: serviceIds } });
        if (foundServices.length !== serviceIds.length) {
            return res.status(404).json({ message: 'One or more services not found' });
        }
        const newBooking = new BookingModel({
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
    }
    catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});
const getBookingsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail } = req.params;
        const bookings = yield BookingModel.find({ userEmail }).populate('services').exec();
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this email' });
        }
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
});
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BookingModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
});
module.exports = {
    getBookings,
    createBooking,
    getBookingsByEmail,
    deleteBooking,
};
