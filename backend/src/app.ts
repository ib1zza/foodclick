import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { HttpError } from './lib/http.js';
import { promotionsRouter } from './routes/promotions.js';
import { productsRouter } from './routes/products.js';
import { storeCategoriesRouter } from './routes/storeCategories.js';
import { storesRouter } from './routes/stores.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/store-categories', storeCategoriesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/promotions', promotionsRouter);
app.use('/api/products', productsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      issues: error.issues,
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});
