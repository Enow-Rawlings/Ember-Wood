-- =============================================================================
-- Migration 020: Minimum order quantity per product
-- Some products (e.g. pallets, bulk loads) require a minimum order quantity.
-- =============================================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS min_order_quantity INTEGER NOT NULL DEFAULT 1
    CHECK (min_order_quantity >= 1);

COMMENT ON COLUMN products.min_order_quantity IS
  'Minimum quantity a customer must order. 1 = no restriction. Higher values enforce bulk ordering (e.g. pallets = 1 but that IS the minimum unit).';
