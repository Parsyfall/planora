import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { apiRateLimit } from './common/middleware/rateLimit.middleware.js';
import { notFoundMiddleware } from './common/middleware/notFound.middleware.js';
import { errorMiddleware } from './common/middleware/error.middleware.js';

const app = express();

app.use(helmet());
const allowedOrigins = env.appOrigin.split(',').map(origin => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(apiRateLimit);

app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
