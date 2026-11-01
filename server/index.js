import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initializeDatabase, checkDatabaseHealth } from './config/db.js';
import { seedInitialData } from './seeds/seedData.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localDist = path.join(__dirname, 'dist');
const parentDist = path.join(__dirname, '../dist');
const activeDist = fs.existsSync(localDist) ? localDist : (fs.existsSync(parentDist) ? parentDist : null);

// Serve Vite frontend build
if (activeDist) {
  console.log(`[Static Files] Serving frontend from: ${activeDist}`);
  app.use(express.static(activeDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(activeDist, 'index.html'));
  });
} else {
  console.warn('[Static Files] No frontend dist folder found. Serving API landing page.');
  app.get('/', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Safar Travel Platform</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 60px 20px; }
            .card { max-width: 540px; margin: 0 auto; background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 20px; padding: 40px; }
            h1 { color: #00df89; margin: 12px 0; }
            .badge { display: inline-block; background: rgba(0, 223, 137, 0.15); color: #00df89; padding: 6px 16px; border-radius: 9999px; font-weight: 600; font-size: 14px; }
            a { color: #38bdf8; text-decoration: none; font-weight: 600; }
            p { color: #94a3b8; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">● Safar API Operational</span>
            <h1>🌍 Safar Travel Platform</h1>
            <p>Database connected & services online at <strong>shreyashjathar.com</strong>.</p>
            <p><a href="/api/system/health">View Live Database Health &rarr;</a></p>
          </div>
        </body>
      </html>
    `);
  });
}

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
