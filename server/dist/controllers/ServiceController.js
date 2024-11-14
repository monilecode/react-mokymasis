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
const { ServiceModel } = require('../models/ServiceModel');
const { BookingModel } = require('../models/BookingModel');
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield ServiceModel.find().populate('bookings');
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving services', error: error.message });
    }
});
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel.findById(req.params.id).populate('bookings');
        if (service) {
            res.json(service);
        }
        else {
            res.status(404).json({ message: 'Service not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving service', error: error.message });
    }
});
const getServicesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const servicesByCategory = yield ServiceModel.find({ categoryTag: { $regex: new RegExp(category, 'i') } });
        res.json(servicesByCategory);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving services' });
    }
});
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newService = new ServiceModel({
            heading: req.body.heading,
            img: req.body.img,
            name: req.body.name,
            address: req.body.address,
            categoryTag: req.body.categoryTag,
        });
        yield newService.save();
        res.json({
            success: true,
            message: 'Service added successfully',
            serviceId: newService._id,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
});
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const updatedService = yield ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
});
const getServiceBookingsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceId, date } = req.params;
        const bookings = yield BookingModel.find({
            services: serviceId,
            date: new Date(date),
        })
            .populate('services')
            .exec();
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this service on the specified date' });
        }
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
});
module.exports = {
    getServices,
    createService,
    getServicesByCategory,
    getServiceById,
    updateService,
    getServiceBookingsByDate,
};
