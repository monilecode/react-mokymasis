const express = require('express');
const {
  getServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  getServiceBookingsByDate,
} = require('../controllers/ServiceController');

const ServiceRoutes = express.Router();

ServiceRoutes.get('/', getServices);
ServiceRoutes.post('/', createService);
ServiceRoutes.get('/category/:category', getServicesByCategory);
ServiceRoutes.get('/:id', getServiceById);
ServiceRoutes.put('/:id', updateService);
ServiceRoutes.get('/:serviceId/bookings/date/:date', getServiceBookingsByDate);

module.exports = { ServiceRoutes };