'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const path_1 = __importDefault(require('path'));
const morgan_1 = __importDefault(require('morgan'));
const dotenv_1 = __importDefault(require('dotenv'));
const cors_1 = __importDefault(require('cors'));
const db_1 = require('./db');
const CategoryRoutes_1 = require('./routes/CategoryRoutes');
const ServiceRoutes_1 = require('./routes/ServiceRoutes');
const BookingRoutes_1 = require('./routes/BookingRoutes');
const AuthRoutes_1 = require('./routes/AuthRoutes');
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configure CORS to allow requests from your client domain
const corsOptions = {
  origin: 'https://client-rho-ten-24.vercel.app',
  optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/categories', CategoryRoutes_1.CategoryRoutes);
app.use('/services', ServiceRoutes_1.ServiceRoutes);
app.use('/bookings', BookingRoutes_1.BookingRoutes);
app.use(AuthRoutes_1.AuthRoutes);
(0, db_1.connectToDb)()
  .then(() =>
    app.listen(db_1.PORT, () =>
      console.log(`Server running on port ${process.env.PROTOCOL}://${process.env.HOST}:${db_1.PORT}`),
    ),
  )
  .catch((err) => console.error('Failed to connect to the database', err));
module.exports = app;
