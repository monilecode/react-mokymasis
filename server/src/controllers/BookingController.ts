const mongoose = require('mongoose');
const { BookingModel } = require('../models/BookingModel');
const { ServiceModel } = require('../models/ServiceModel');

const getBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('services').exec();

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

const createBooking = async (req, res) => {
  try {
    const { userEmail, userName, services, status, date, time } = req.body;

    const serviceIds = services.map((id) => new mongoose.Types.ObjectId(id));

    const foundServices = await ServiceModel.find({ _id: { $in: serviceIds } });
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

    await newBooking.save();

    for (const service of foundServices) {
      service.bookings.push(newBooking._id);
      await service.save();
    }

    res.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: newBooking._id,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

const getBookingsByEmail = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const bookings = await BookingModel.find({ userEmail }).populate('services').exec();

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this email' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await BookingModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

module.exports = {
  getBookings,
  createBooking,
  getBookingsByEmail,
  deleteBooking,
};
