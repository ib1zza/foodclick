import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { HttpError, asyncHandler } from '../lib/http.js';

export const productsRouter = Router();

const productsQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

productsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = productsQuerySchema.parse(req.query);

    if (!query.search) {
      res.json([]);
      return;
    }

    const limit = query.limit ?? 8;
    const searchValue = `%${query.search}%`;
    const result = await pool.query(
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
          p.currency,
          p.tag,
          p.tone,
          p.is_customizable,
          json_build_object(
            'id', s.id,
            'slug', s.slug,
            'name', s.name
          ) AS store
        FROM products p
        INNER JOIN stores s ON s.id = p.store_id
        WHERE p.is_active = TRUE
          AND s.is_active = TRUE
          AND (p.name ILIKE $1 OR p.description ILIKE $1)
        ORDER BY
          CASE WHEN p.name ILIKE $1 THEN 0 ELSE 1 END,
          p.sort_order ASC,
          p.name ASC
        LIMIT $2
      `,
      [searchValue, limit],
    );

    res.json(result.rows);
  }),
);

productsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      throw new HttpError(400, 'Product id must be a positive integer');
    }

    const productResult = await pool.query(
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
          p.updated_at,
          json_build_object(
            'id', s.id,
            'slug', s.slug,
            'name', s.name
          ) AS store
        FROM products p
        INNER JOIN stores s ON s.id = p.store_id
        WHERE p.id = $1
          AND p.is_active = TRUE
          AND s.is_active = TRUE
      `,
      [productId],
    );

    const product = productResult.rows[0];

    if (!product) {
      throw new HttpError(404, 'Product not found');
    }

    if (!product.is_customizable) {
      res.json({
        ...product,
        option_groups: [],
      });
      return;
    }

    const optionGroupsResult = await pool.query(
      `
        SELECT
          pog.id,
          pog.product_id,
          pog.name,
          pog.selection_type,
          pog.is_required,
          pog.min_select,
          pog.max_select,
          pog.sort_order,
          pog.created_at,
          pog.updated_at,
          COALESCE(
            json_agg(
              json_build_object(
                'id', po.id,
                'group_id', po.group_id,
                'name', po.name,
                'price_delta', po.price_delta,
                'is_default', po.is_default,
                'is_active', po.is_active,
                'sort_order', po.sort_order,
                'created_at', po.created_at,
                'updated_at', po.updated_at
              )
              ORDER BY po.sort_order ASC, po.name ASC
            ) FILTER (WHERE po.id IS NOT NULL AND po.is_active = TRUE),
            '[]'::json
          ) AS options
        FROM product_option_groups pog
        LEFT JOIN product_options po ON po.group_id = pog.id
        WHERE pog.product_id = $1
        GROUP BY pog.id
        ORDER BY pog.sort_order ASC, pog.name ASC
      `,
      [productId],
    );

    res.json({
      ...product,
      option_groups: optionGroupsResult.rows,
    });
  }),
);
