"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ServiceController_1 = require("../controllers/ServiceController");
const ServiceRoutes = express_1.default.Router();
exports.ServiceRoutes = ServiceRoutes;
ServiceRoutes.get('/', ServiceController_1.getServices);
ServiceRoutes.post('/', ServiceController_1.createService);
ServiceRoutes.get('/category/:category', ServiceController_1.getServicesByCategory);
ServiceRoutes.get('/:id', ServiceController_1.getServiceById);
ServiceRoutes.put('/:id', ServiceController_1.updateService);
ServiceRoutes.get('/:serviceId/bookings/date/:date', ServiceController_1.getServiceBookingsByDate);
