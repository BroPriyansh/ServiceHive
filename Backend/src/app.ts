import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { protect } from './middleware/auth.middleware';
import leadRoutes from './routes/lead.routes';


import authRoutes from './routes/auth.routes';

const app = express();

const normalizeOrigin = (origin: string) =>
  origin.trim().replace(/\/+$/u, '');

const allowedOrigins = (
  process.env.CLIENT_URL ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          `Origin ${origin} is not allowed by CORS`
        )
      );
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (_, res) => {
  res.json({
    success: true,
    message: 'API Running',
  });
});

app.get('/api/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Protected route accessed',
  });
});

export default app;