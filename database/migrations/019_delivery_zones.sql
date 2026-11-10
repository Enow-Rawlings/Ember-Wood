-- =============================================================================
-- Migration 019: Delivery zones and rules + Emberwood order status workflow
-- =============================================================================

-- ─── Update order status enum ─────────────────────────────────────────────────
-- Extend the existing enum with Emberwood's full workflow states.
-- PostgreSQL cannot DROP values from enums safely; we ADD new values instead.
-- The peptide-era statuses are kept for now to avoid breaking existing data;
-- unused ones can be purged after a confirmed data migration.

ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'awaiting_customer_confirmation';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'payment_verification_pending';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'paid';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'dispatched';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'delivered';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'refunded';

-- Update payment_status enum
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'verification_pending';

-- Remove market_code requirement from orders (not used by Emberwood)
ALTER TABLE orders
  ALTER COLUMN market_code DROP NOT NULL,
  ALTER COLUMN market_code SET DEFAULT 'GB';

-- ─── Delivery zones ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS delivery_zones (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                      TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  -- Countries covered (ISO 3166-1 alpha-2, comma-separated or JSONB array)
  country_codes             TEXT[] NOT NULL DEFAULT '{}',
  -- Freeform region name for display (e.g. "South East England")
  region_name               TEXT,
  -- Postcode/zip pattern prefix list for matching (e.g. '{SW,SE,E,EC,WC,W,N,NW}')
  postcode_prefixes         TEXT[] NOT NULL DEFAULT '{}',
  is_active                 BOOLEAN NOT NULL DEFAULT TRUE,
  -- Pricing
  base_charge               NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (base_charge >= 0),
  free_delivery_threshold   NUMERIC(10, 2),  -- order subtotal above which delivery is free
  min_order_amount          NUMERIC(10, 2),  -- minimum order to qualify for delivery
  -- Timing
  lead_time_days            SMALLINT NOT NULL DEFAULT 3 CHECK (lead_time_days >= 0),
  estimated_delivery_text   TEXT,            -- e.g. "3-5 working days"
  -- Collection
  collection_available      BOOLEAN NOT NULL DEFAULT FALSE,
  collection_address        TEXT,
  -- Notes
  notes                     TEXT,
  -- Ordering
  sort_order                INTEGER NOT NULL DEFAULT 0,
  created_by                UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  updated_by                UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_delivery_zones_active        ON delivery_zones(is_active);
CREATE INDEX IF NOT EXISTS idx_delivery_zones_country_codes ON delivery_zones USING GIN(country_codes);
CREATE INDEX IF NOT EXISTS idx_delivery_zones_postcodes     ON delivery_zones USING GIN(postcode_prefixes);

COMMENT ON TABLE  delivery_zones IS 'Configurable delivery areas. Admin manages zones, charges and lead times without developer intervention.';
COMMENT ON COLUMN delivery_zones.postcode_prefixes IS 'Postcode/zip prefix list for serviceability lookup (e.g. SW, SE, BN). Case-insensitive matching done at API layer.';
COMMENT ON COLUMN delivery_zones.free_delivery_threshold IS 'NULL = no free delivery threshold for this zone.';
COMMENT ON COLUMN delivery_zones.min_order_amount IS 'NULL = no minimum order for this zone.';

-- Updated_at trigger
CREATE TRIGGER set_delivery_zones_updated_at
  BEFORE UPDATE ON delivery_zones
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Shipping classes (for products with special handling) ─────────────────────

CREATE TABLE IF NOT EXISTS shipping_classes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE CHECK (char_length(name) BETWEEN 1 AND 100),
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO shipping_classes (name, description) VALUES
  ('standard',    'Standard palletised or bagged delivery'),
  ('bulk',        'Bulk loose load — requires suitable access'),
  ('pallet',      'Full pallet — requires pallet truck or forklift'),
  ('collection',  'Collection only — no delivery available')
ON CONFLICT (name) DO NOTHING;

-- Add shipping_class reference to products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS shipping_class_id UUID REFERENCES shipping_classes(id) ON DELETE SET NULL;

-- ─── Serviceability lookup log (optional audit) ───────────────────────────────

CREATE TABLE IF NOT EXISTS serviceability_checks (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  postcode       TEXT NOT NULL,
  country_code   TEXT NOT NULL,
  zone_id        UUID REFERENCES delivery_zones(id) ON DELETE SET NULL,
  is_serviceable BOOLEAN NOT NULL,
  checked_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_serviceability_postcode ON serviceability_checks(postcode, country_code, checked_at DESC);

COMMENT ON TABLE serviceability_checks IS 'Audit of customer delivery checks. Not required for functionality; useful for understanding demand in unserved areas.';

-- ─── Seed default UK delivery zone ────────────────────────────────────────────

INSERT INTO delivery_zones (
  name,
  country_codes,
  region_name,
  postcode_prefixes,
  is_active,
  base_charge,
  free_delivery_threshold,
  min_order_amount,
  lead_time_days,
  estimated_delivery_text,
  collection_available,
  notes,
  sort_order
) VALUES (
  'United Kingdom — Standard',
  ARRAY['GB'],
  'Mainland UK',
  ARRAY[]::TEXT[],  -- Empty = whole country (configure postcode prefixes to restrict)
  TRUE,
  9.99,
  100.00,
  20.00,
  3,
  '3-5 working days',
  FALSE,
  'Default UK zone. Delivery charges and availability confirmed on order request. Some remote areas may require additional lead time.',
  1
) ON CONFLICT DO NOTHING;
