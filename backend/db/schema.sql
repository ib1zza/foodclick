CREATE TABLE IF NOT EXISTS store_categories (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stores (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES store_categories(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  banner_url TEXT,
  delivery_time_text TEXT,
  delivery_time_min INTEGER CHECK (delivery_time_min IS NULL OR delivery_time_min >= 0),
  delivery_time_max INTEGER CHECK (delivery_time_max IS NULL OR delivery_time_max >= 0),
  rating NUMERIC(3,2) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  min_order_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (min_order_amount >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('product', 'dish')),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  old_price NUMERIC(10,2) CHECK (old_price IS NULL OR old_price >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'RUB',
  tag TEXT,
  tone TEXT,
  is_customizable BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promotions (
  id BIGSERIAL PRIMARY KEY,
  store_id BIGINT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_option_groups (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  selection_type TEXT NOT NULL CHECK (selection_type IN ('single', 'multiple')),
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  min_select INTEGER NOT NULL DEFAULT 0 CHECK (min_select >= 0),
  max_select INTEGER NOT NULL DEFAULT 1 CHECK (max_select >= 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (max_select >= min_select),
  CHECK (selection_type <> 'single' OR max_select = 1),
  CHECK (NOT is_required OR min_select >= 1)
);

CREATE TABLE IF NOT EXISTS product_options (
  id BIGSERIAL PRIMARY KEY,
  group_id BIGINT NOT NULL REFERENCES product_option_groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price_delta NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_store_categories_is_active
  ON store_categories (is_active);

CREATE INDEX IF NOT EXISTS idx_stores_category_id
  ON stores (category_id);

CREATE INDEX IF NOT EXISTS idx_stores_is_active
  ON stores (is_active);

CREATE INDEX IF NOT EXISTS idx_products_store_id
  ON products (store_id);

CREATE INDEX IF NOT EXISTS idx_products_type
  ON products (type);

CREATE INDEX IF NOT EXISTS idx_products_is_active
  ON products (is_active);

CREATE INDEX IF NOT EXISTS idx_products_store_id_is_active
  ON products (store_id, is_active);

CREATE INDEX IF NOT EXISTS idx_promotions_store_id
  ON promotions (store_id);

CREATE INDEX IF NOT EXISTS idx_promotions_is_active
  ON promotions (is_active);

CREATE INDEX IF NOT EXISTS idx_product_option_groups_product_id
  ON product_option_groups (product_id);

CREATE INDEX IF NOT EXISTS idx_product_options_group_id
  ON product_options (group_id);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_store_categories_updated_at ON store_categories;
CREATE TRIGGER trg_store_categories_updated_at
BEFORE UPDATE ON store_categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_stores_updated_at ON stores;
CREATE TRIGGER trg_stores_updated_at
BEFORE UPDATE ON stores
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_promotions_updated_at ON promotions;
CREATE TRIGGER trg_promotions_updated_at
BEFORE UPDATE ON promotions
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_product_option_groups_updated_at ON product_option_groups;
CREATE TRIGGER trg_product_option_groups_updated_at
BEFORE UPDATE ON product_option_groups
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_product_options_updated_at ON product_options;
CREATE TRIGGER trg_product_options_updated_at
BEFORE UPDATE ON product_options
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION validate_product_customization()
RETURNS TRIGGER AS $$
DECLARE
  customizable BOOLEAN;
BEGIN
  SELECT is_customizable INTO customizable
  FROM products
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);

  IF customizable IS FALSE THEN
    RAISE EXCEPTION 'Option groups are allowed only for customizable products';
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_product_customization_insert ON product_option_groups;
CREATE TRIGGER trg_validate_product_customization_insert
BEFORE INSERT OR UPDATE ON product_option_groups
FOR EACH ROW
EXECUTE FUNCTION validate_product_customization();

CREATE OR REPLACE FUNCTION prevent_disabling_customizable_product_with_groups()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_customizable = FALSE AND EXISTS (
    SELECT 1
    FROM product_option_groups pog
    WHERE pog.product_id = NEW.id
  ) THEN
    RAISE EXCEPTION 'Product with option groups must stay customizable';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_customizable_guard ON products;
CREATE TRIGGER trg_products_customizable_guard
BEFORE UPDATE OF is_customizable ON products
FOR EACH ROW
EXECUTE FUNCTION prevent_disabling_customizable_product_with_groups();
