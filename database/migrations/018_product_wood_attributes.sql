-- =============================================================================
-- Migration 018: Emberwood product wood attributes
-- Adds firewood/timber-specific fields to the products table.
-- All nullable — only populated when genuinely known and documented.
-- =============================================================================

-- ─── Simplify the product status machine ─────────────────────────────────────
-- Emberwood has no compliance gate. Drop the peptide-era compliance columns
-- and simplify the status enum.
-- Note: compliance_status, compliance_reviewed_by, compliance_reviewed_at,
-- compliance_evidence_ref and the product_market_rules table are removed here.

-- Remove compliance-specific columns from products
ALTER TABLE products
  DROP COLUMN IF EXISTS compliance_status,
  DROP COLUMN IF EXISTS compliance_reviewed_by,
  DROP COLUMN IF EXISTS compliance_reviewed_at,
  DROP COLUMN IF EXISTS compliance_evidence_ref;

-- Drop the product_market_rules table (peptide per-country eligibility gate)
DROP TABLE IF EXISTS product_market_rules;

-- Drop the market_eligibility enum if it exists
DROP TYPE IF EXISTS market_eligibility;

-- Drop the compliance_status enum if it exists
DROP TYPE IF EXISTS compliance_status;

-- ─── Wood-specific attributes ─────────────────────────────────────────────────

-- wood_type enum
DO $$ BEGIN
  CREATE TYPE wood_type AS ENUM ('hardwood', 'softwood', 'mixed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE products
  -- Species / classification
  ADD COLUMN IF NOT EXISTS wood_species        TEXT,
  ADD COLUMN IF NOT EXISTS wood_type           wood_type,
  ADD COLUMN IF NOT EXISTS wood_condition      TEXT,   -- 'Kiln-dried', 'Seasoned', 'Air-dried', etc.

  -- Physical dimensions
  ADD COLUMN IF NOT EXISTS log_length_cm       NUMERIC(6, 1),  -- approximate log length
  ADD COLUMN IF NOT EXISTS weight_kg           NUMERIC(8, 2),  -- pack weight
  ADD COLUMN IF NOT EXISTS volume_description  TEXT,           -- human-readable volume (e.g. "1.2m³ bulk bag")

  -- Pack
  ADD COLUMN IF NOT EXISTS pack_format         TEXT,   -- 'Net bag', 'Bulk bag', 'Crate', 'Pallet', etc.

  -- Moisture content — ONLY fill when genuinely tested and documented.
  -- Include measurement date/batch reference in the text.
  ADD COLUMN IF NOT EXISTS moisture_content    TEXT,

  -- Intended use
  ADD COLUMN IF NOT EXISTS intended_use        TEXT,   -- 'Open fireplace', 'Wood-burning stove', etc.

  -- Sale pricing
  ADD COLUMN IF NOT EXISTS sale_price          NUMERIC(12, 2) CHECK (sale_price IS NULL OR sale_price >= 0);

-- Add check constraint: sale_price must be less than price when set
ALTER TABLE products
  ADD CONSTRAINT chk_sale_price_less_than_price
    CHECK (sale_price IS NULL OR sale_price < price);

-- Indexes for catalogue filtering
CREATE INDEX IF NOT EXISTS idx_products_wood_type      ON products(wood_type) WHERE wood_type IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_wood_condition ON products(wood_condition) WHERE wood_condition IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_pack_format    ON products(pack_format) WHERE pack_format IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_log_length     ON products(log_length_cm) WHERE log_length_cm IS NOT NULL;

COMMENT ON COLUMN products.wood_species       IS 'Actual species or mix, e.g. "Oak", "Ash", "Mixed hardwood". Do not invent.';
COMMENT ON COLUMN products.wood_condition     IS 'Accurate condition descriptor: Kiln-dried, Seasoned, Air-dried, Freshly cut, Untreated.';
COMMENT ON COLUMN products.moisture_content   IS 'Only populate when genuinely tested and documented. Include batch/date reference.';
COMMENT ON COLUMN products.volume_description IS 'Human-readable quantity. Define units explicitly (m³, litres, kg).';
COMMENT ON COLUMN products.sale_price         IS 'Active sale price. Must be less than price when set. NULL = no current sale.';
