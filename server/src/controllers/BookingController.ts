import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { BookingModel } from '../models/BookingModel';
import { ServiceModel } from '../models/ServiceModel';

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await BookingModel.find().populate('services').exec();

    res.json(bookings);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings' });
    return;
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userEmail, userName, services, status, date, time } = req.body;

    const serviceIds = services.map((id: string) => new mongoose.Types.ObjectId(id));

    const foundServices = await ServiceModel.find({ _id: { $in: serviceIds } });
    if (foundServices.length !== serviceIds.length) {
      res.status(404).json({ message: 'One or more services not found' });
      return;
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
      service.bookings.push(newBooking._id as mongoose.Types.ObjectId);
      await service.save();
    }

    res.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: newBooking._id,
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error creating booking', error: errorMessage });
    return;
  }
};

export const getBookingsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userEmail } = req.params;
    const bookings = await BookingModel.find({ userEmail }).populate('services').exec();

    if (!bookings.length) {
      res.status(404).json({ message: 'No bookings found for this email' });
      return;
    }

    res.json(bookings);
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error retrieving bookings', error: errorMessage });
    return;
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    await BookingModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Booking deleted successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
    return;
  }
};
