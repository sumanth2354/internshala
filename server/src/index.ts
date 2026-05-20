import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import {
  globalErrorHandler,
  notFoundHandler,
} from './middleware/error.middleware';

const app: Application = express();
const PORT = process.env.PORT ?? 5000;
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP. Please try again later.',
});

app.use('/api', limiter);

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

startServer();

export default app;
