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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceBookingsByDate = exports.updateService = exports.createService = exports.getServicesByCategory = exports.getServiceById = exports.getServices = void 0;
const ServiceModel_1 = require("../models/ServiceModel");
const BookingModel_1 = require("../models/BookingModel");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield ServiceModel_1.ServiceModel.find().populate('bookings');
        res.json(services);
        return;
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error retrieving services', error: errorMessage });
        return;
    }
});
exports.getServices = getServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel_1.ServiceModel.findById(req.params.id).populate('bookings');
        if (service) {
            res.json(service);
            return;
        }
        else {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error retrieving service', error: errorMessage });
        return;
    }
});
exports.getServiceById = getServiceById;
const getServicesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const servicesByCategory = yield ServiceModel_1.ServiceModel.find({ categoryTag: { $regex: new RegExp(category, 'i') } });
        res.json(servicesByCategory);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving services' });
        return;
    }
});
exports.getServicesByCategory = getServicesByCategory;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newService = new ServiceModel_1.ServiceModel({
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
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service' });
        return;
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel_1.ServiceModel.findById(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        const updatedService = yield ServiceModel_1.ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
        return;
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error updating service', error: errorMessage });
        return;
    }
});
exports.updateService = updateService;
const getServiceBookingsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceId, date } = req.params;
        const bookings = yield BookingModel_1.BookingModel.find({
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
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error retrieving bookings', error: errorMessage });
        return;
    }
});
exports.getServiceBookingsByDate = getServiceBookingsByDate;
