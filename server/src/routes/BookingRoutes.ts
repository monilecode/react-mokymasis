import express from 'express';
import { getBookings, getBookingsByEmail, deleteBooking, createBooking } from '../controllers/BookingController';

const BookingRoutes = express.Router();

BookingRoutes.get('/', getBookings);
BookingRoutes.post('/', createBooking);
BookingRoutes.get('/user/:userEmail', getBookingsByEmail);
BookingRoutes.delete('/:id', deleteBooking);

export { BookingRoutes };
