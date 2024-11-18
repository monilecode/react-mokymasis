import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb, PORT } from './db';

import { CategoryRoutes } from './routes/CategoryRoutes';
import { ServiceRoutes } from './routes/ServiceRoutes';
import { BookingRoutes } from './routes/BookingRoutes';
import { AuthRoutes } from './routes/AuthRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/categories', CategoryRoutes);
app.use('/services', ServiceRoutes);
app.use('/bookings', BookingRoutes);
app.use(AuthRoutes);

connectToDb()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`)),
  )
  .catch((err) => console.error('Failed to connect to the database', err));
