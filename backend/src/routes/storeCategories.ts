import { Router } from 'express';

import { pool } from '../db/pool.js';
import { asyncHandler } from '../lib/http.js';

export const storeCategoriesRouter = Router();

storeCategoriesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const result = await pool.query(
      `
        SELECT
          id,
          slug,
          name,
          sort_order,
          is_active,
          created_at,
          updated_at
        FROM store_categories
        WHERE is_active = TRUE
        ORDER BY sort_order ASC, name ASC
      `,
    );

    res.json(result.rows);
  }),
);
