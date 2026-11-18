import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

import providerRoutes from './routes/providerRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import programmeRoutes from './routes/programmeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import automationRoutes from './routes/automationRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use('/api/providers', providerRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    suite: 'Pawzz Unified Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Initialize database and start server
async function startServer() {
  await connectDB();
  const PORT = ENV.PORT;
  app.listen(PORT, () => {
    console.log(`
======================================================
  🚀 PAWZZ PRODUCTION BACKEND OPERATIONAL
  📡 Running at:         http://localhost:${PORT}
  🐾 Pawzz Care API:     /api/providers
  🎓 Upwise Academy API: /api/programmes & /api/enquiries
  🎨 Framewise Studio:   /api/projects & /api/ai
  ⚙️ Automation Webhook:  /api/automation/slidepilot/webhook
======================================================
    `);
  });
}

startServer();

