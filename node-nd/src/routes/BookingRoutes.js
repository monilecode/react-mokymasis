const express = require('express');
const { getBookings, createBooking, getBookingsByEmail, deleteBooking } = require('../controllers/BookingController');

const BookingRoutes = express.Router();

BookingRoutes.get('/', getBookings);
BookingRoutes.post('/', createBooking);
BookingRoutes.get('/user/:userEmail', getBookingsByEmail);
BookingRoutes.delete('/:id', deleteBooking);

module.exports = { BookingRoutes };
