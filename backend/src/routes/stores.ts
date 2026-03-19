import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { HttpError, asyncHandler } from '../lib/http.js';

export const storesRouter = Router();

const storesQuerySchema = z.object({
  category_slug: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
  product_search: z.string().trim().min(1).optional(),
});

const storeProductsQuerySchema = z.object({
  type: z.enum(['product', 'dish']).optional(),
  search: z.string().trim().min(1).optional(),
});

storesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = storesQuerySchema.parse(req.query);
    const params: Array<string> = [];
    const conditions = [
      's.is_active = TRUE',
      `EXISTS (
        SELECT 1
        FROM products p
        WHERE p.store_id = s.id
          AND p.is_active = TRUE
      )`,
    ];

    if (query.category_slug) {
      params.push(query.category_slug);
      conditions.push(`sc.slug = $${params.length}`);
    }

    if (query.search) {
      params.push(`%${query.search}%`);
      conditions.push(`(s.name ILIKE $${params.length} OR s.description ILIKE $${params.length})`);
    }

    if (query.product_search) {
      params.push(`%${query.product_search}%`);
      conditions.push(
        `EXISTS (
          SELECT 1
          FROM products p_search
          WHERE p_search.store_id = s.id
            AND p_search.is_active = TRUE
            AND (p_search.name ILIKE $${params.length} OR p_search.description ILIKE $${params.length})
        )`,
      );
    }

    const result = await pool.query(
      `
        SELECT
          s.id,
          s.slug,
          s.name,
          s.description,
          s.logo_url,
          s.banner_url,
          s.delivery_time_text,
          s.delivery_time_min,
          s.delivery_time_max,
          s.rating,
          s.min_order_amount,
          s.is_active,
          s.created_at,
          s.updated_at,
          json_build_object(
            'id', sc.id,
            'slug', sc.slug,
            'name', sc.name,
            'sort_order', sc.sort_order
          ) AS category
        FROM stores s
        INNER JOIN store_categories sc ON sc.id = s.category_id
        WHERE ${conditions.join(' AND ')}
        ORDER BY sc.sort_order ASC, s.rating DESC, s.name ASC
      `,
      params,
    );

    res.json(result.rows);
  }),
);

storesRouter.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const result = await pool.query(
      `
        SELECT
          s.id,
          s.slug,
          s.name,
          s.description,
          s.logo_url,
          s.banner_url,
          s.delivery_time_text,
          s.delivery_time_min,
          s.delivery_time_max,
          s.rating,
          s.min_order_amount,
          s.is_active,
          s.created_at,
          s.updated_at,
          json_build_object(
            'id', sc.id,
            'slug', sc.slug,
            'name', sc.name,
            'sort_order', sc.sort_order
          ) AS category
        FROM stores s
        INNER JOIN store_categories sc ON sc.id = s.category_id
        WHERE s.slug = $1
          AND s.is_active = TRUE
          AND EXISTS (
            SELECT 1
            FROM products p
            WHERE p.store_id = s.id
              AND p.is_active = TRUE
          )
      `,
      [req.params.slug],
    );

    const store = result.rows[0];

    if (!store) {
      throw new HttpError(404, 'Store not found');
    }

    res.json(store);
  }),
);

storesRouter.get(
  '/:slug/products',
  asyncHandler(async (req, res) => {
    const query = storeProductsQuerySchema.parse(req.query);
    const storeResult = await pool.query(
      `
        SELECT
          s.id,
          s.slug,
          s.name,
          json_build_object(
            'id', sc.id,
            'slug', sc.slug,
            'name', sc.name,
            'sort_order', sc.sort_order
          ) AS category
        FROM stores s
        INNER JOIN store_categories sc ON sc.id = s.category_id
        WHERE s.slug = $1
          AND s.is_active = TRUE
          AND EXISTS (
            SELECT 1
            FROM products p
            WHERE p.store_id = s.id
              AND p.is_active = TRUE
          )
      `,
      [req.params.slug],
    );

    const store = storeResult.rows[0];

    if (!store) {
      throw new HttpError(404, 'Store not found');
    }

    const params: Array<string | number> = [store.id];
    const conditions = ['p.store_id = $1', 'p.is_active = TRUE'];

    if (query.type) {
      params.push(query.type);
      conditions.push(`p.type = $${params.length}`);
    }

    if (query.search) {
      params.push(`%${query.search}%`);
      conditions.push(`(p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`);
    }

    const productsResult = await pool.query(
      `
        SELECT
          p.id,
          p.store_id,
          p.type,
          p.name,
          p.slug,
          p.description,
          p.image_url,
          p.price,
          p.old_price,
          p.currency,
          p.tag,
          p.tone,
          p.is_customizable,
          p.is_active,
          p.sort_order,
          p.created_at,
          p.updated_at
        FROM products p
        WHERE ${conditions.join(' AND ')}
        ORDER BY p.sort_order ASC, p.name ASC
      `,
      params,
    );

    res.json({
      store,
      items: productsResult.rows,
    });
  }),
);
