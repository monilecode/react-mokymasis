const mongoose = require('mongoose');
const { ServiceModel } = require('../models/ServiceModel');
const { BookingModel } = require('../models/BookingModel');

const getServices = async (req, res) => {
  try {
    const services = await ServiceModel.find().populate('bookings');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving services', error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.id).populate('bookings');
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving service', error: error.message });
  }
};

const getServicesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const servicesByCategory = await ServiceModel.find({ categoryTag: { $regex: new RegExp(category, 'i') } });
    res.json(servicesByCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving services' });
  }
};

const createService = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

const getServiceBookingsByDate = async (req, res) => {
  try {
    const { serviceId, date } = req.params;
    const bookings = await BookingModel.find({
      services: serviceId,
      date: new Date(date),
    })
      .populate('services')
      .exec();

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this service on the specified date' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
  }
};

module.exports = {
  getServices,
  createService,
  getServicesByCategory,
  getServiceById,
  updateService,
  getServiceBookingsByDate,
};
