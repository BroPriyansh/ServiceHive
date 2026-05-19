import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { protect } from './middleware/auth.middleware';
import leadRoutes from './routes/lead.routes';

import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
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