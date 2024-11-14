"use strict";
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const { connectToDb, PORT } = require('./db');
const { CategoryRoutes } = require('./routes/CategoryRoutes');
const { ServiceRoutes } = require('./routes/ServiceRoutes');
const { BookingRoutes } = require('./routes/BookingRoutes');
const { AuthRoutes } = require('./routes/AuthRoutes');
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/categories', CategoryRoutes);
app.use('/services', ServiceRoutes);
app.use('/bookings', BookingRoutes);
app.use('/auth', AuthRoutes);
connectToDb()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`)))
    .catch((err) => console.error('Failed to connect to the database', err));
