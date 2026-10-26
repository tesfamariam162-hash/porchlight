import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import apartmentRoutes from './routes/apartmentRoutes.js';
import amenityRoutes from './routes/amenityRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || env.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/apartments', apartmentRoutes);
  app.use('/api/amenities', amenityRoutes);
  app.use('/api/customers', customerRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use('/api', (_req, res) => {
    res.status(404).json({ message: 'API route not found' });
  });

  app.use(errorHandler);

  return app;
}
