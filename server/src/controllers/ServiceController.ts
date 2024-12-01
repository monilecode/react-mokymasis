import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ServiceModel } from '../models/ServiceModel';
import { BookingModel } from '../models/BookingModel';

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceModel.find().populate('bookings');
    res.json(services);
    return;
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving services', error: errorMessage });
    return;
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await ServiceModel.findById(req.params.id).populate('bookings');
    if (service) {
      res.json(service);
      return;
    } else {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving service', error: errorMessage });
    return;
  }
};

export const getServicesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category;
    const servicesByCategory = await ServiceModel.find({ categoryTag: { $regex: new RegExp(category, 'i') } });
    res.json(servicesByCategory);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving services' });
    return;
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const newService = new ServiceModel({
      heading: req.body.heading,
      img: req.body.img,
      name: req.body.name,
      address: req.body.address,
      categoryTag: req.body.categoryTag,
    });
    await newService.save();
    res.json({
      success: true,
      message: 'Service added successfully',
      serviceId: newService._id,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
    return;
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    const updatedService = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
    return;
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error updating service', error: errorMessage });
    return;
  }
};

export const getServiceBookingsByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId, date } = req.params;
    const bookings = await BookingModel.find({
      services: serviceId,
      date: new Date(date),
    })
      .populate('services')
      .exec();

    if (!bookings.length) {
      res.status(404).json({ message: 'No bookings found for this service on the specified date' });
      return;
    }

    res.json(bookings);
    return;
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error retrieving bookings', error: errorMessage });
    return;
  }
};
