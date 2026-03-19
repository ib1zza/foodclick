import { Router } from 'express';

import { pool } from '../db/pool.js';
import { asyncHandler } from '../lib/http.js';

export const promotionsRouter = Router();

promotionsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const result = await pool.query(
      `
        SELECT
          pr.id,
          pr.title,
          pr.description,
          pr.image_url,
          pr.sort_order,
          pr.created_at,
          pr.updated_at,
          json_build_object(
            'id', s.id,
            'slug', s.slug,
            'name', s.name,
            'logo_url', s.logo_url,
            'delivery_time_text', s.delivery_time_text
          ) AS store
        FROM promotions pr
        INNER JOIN stores s ON s.id = pr.store_id
        WHERE pr.is_active = TRUE
          AND s.is_active = TRUE
          AND EXISTS (
            SELECT 1
            FROM products p
            WHERE p.store_id = s.id
              AND p.is_active = TRUE
          )
        ORDER BY pr.sort_order ASC, pr.id ASC
      `,
    );

    res.json(result.rows);
  }),
);
