import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initializeDatabase, checkDatabaseHealth } from './config/db.js';
import { seedInitialData } from './seeds/seedData.js';

// Route Handlers
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import systemRoutes from './routes/systemRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger for active debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes Mounting
app.use('/api/users', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/db', systemRoutes);

// Health check endpoint for fast status checks
app.get('/api/health', async (req, res) => {
  const dbStatus = await checkDatabaseHealth();
  res.status(200).json({
    status: 'online',
    server: 'Safar Travel Platform Express Server',
    database: dbStatus
  });
});

// 404 Route handler for API endpoints
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found` });
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Exception]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server & Initialize Database
async function bootstrap() {
  try {
    console.log("=================================================");
    console.log("  🌍 SAFAR TRAVEL & LUXURY STAYS — BACKEND SERVER");
    console.log("=================================================");

    const dbConnected = await initializeDatabase();
    if (dbConnected) {
      await seedInitialData();
    } else {
      console.warn("[Database] Running in fallback mode. Database may be initializing.");
    }

    app.listen(PORT, () => {
      console.log(`[Ready] Backend API running at http://localhost:${PORT}`);
      console.log(`[Health] Status endpoint: http://localhost:${PORT}/api/health`);
      console.log("=================================================\n");
    });
  } catch (error) {
    console.error("[Bootstrap Fatal Error]:", error);
    process.exit(1);
  }
}

bootstrap();
