import express from 'express';
import {
  getServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  getServiceBookingsByDate,
} from '../controllers/ServiceController';

const ServiceRoutes = express.Router();

ServiceRoutes.get('/', getServices);
ServiceRoutes.post('/', createService);
ServiceRoutes.get('/category/:category', getServicesByCategory);
ServiceRoutes.get('/:id', getServiceById);
ServiceRoutes.put('/:id', updateService);
ServiceRoutes.get('/:serviceId/bookings/date/:date', getServiceBookingsByDate);

export { ServiceRoutes };
