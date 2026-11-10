-- =============================================================================
-- Seed 004: Products that cover remaining filter values
-- Ensures every filter option in the sidebar returns at least one result.
-- Idempotent — ON CONFLICT DO NOTHING throughout.
-- =============================================================================

INSERT INTO products (
  name, slug, sku, short_description, long_description,
  price, currency, status, is_visible,
  stock_quantity, low_stock_threshold,
  wood_species, wood_type, wood_condition,
  log_length_cm, pack_format, weight_kg, volume_description,
  intended_use, min_order_quantity, sale_price
) VALUES

-- ─── Mixed wood type (covers wood_type = 'mixed') ─────────────────────────────
(
  'Mixed Hardwood & Softwood Starter Pack',
  'mixed-hardwood-softwood-starter-pack',
  'MIX-HS-SP-001',
  'A unique blend of hardwood and softwood logs — softwood to get the fire going, hardwood to keep it burning. The ideal starter combination.',
  'This mixed pack combines the best qualities of both wood types. Softwood lights easily and builds heat quickly; hardwood sustains the fire and delivers long-lasting warmth. Together they make fire lighting straightforward and efficient.

The pack contains a 50/50 blend of kiln-dried birch (hardwood) and Scots pine (softwood), both dried below 20% moisture. Approximately 25cm log length. Bulk bag approximately 0.75m³.

Particularly popular with new stove owners who want flexibility, and with customers who use both indoor and outdoor fires.',
  175.00, 'GBP', 'published', TRUE,
  28, 5,
  'Birch and Scots pine', 'mixed', 'Kiln-dried',
  25, 'Bulk bag', 230, 'Approx. 0.75m³ loose fill — 50/50 hardwood/softwood blend',
  'Wood-burning stove, Fire pit, Open fireplace',
  1, 155.00
),

-- ─── Freshly cut (covers wood_condition = 'Freshly cut') ─────────────────────
-- Sold as future-season stock — buyers season it themselves
(
  'Freshly Cut Oak Logs — Green Timber (Season Yourself)',
  'freshly-cut-oak-logs-green-timber',
  'GRN-OAK-BB-001',
  'Freshly cut green oak logs sold for seasoning at home. Ideal for buyers who want to season their own wood and save significantly on cost.',
  'Green (freshly cut) firewood is sold for customers who prefer to season their own wood. Buying green and seasoning at home is significantly cheaper than buying ready-to-burn kiln-dried or seasoned wood, and many experienced burners enjoy the process.

These freshly cut oak logs are split and ready to stack. To use as firewood they will need to be stacked in a ventilated log store for a minimum of 12–18 months before burning. Do not attempt to burn green wood — it produces excessive smoke and can damage your flue.

Bulk bag approximately 0.75m³ at 25cm log length. Moisture content at time of delivery: typically 40–60%.',
  85.00, 'GBP', 'published', TRUE,
  40, 6,
  'Oak', 'hardwood', 'Freshly cut',
  25, 'Bulk bag', 320, 'Approx. 0.75m³ — green/freshly cut, requires 12–18 months seasoning',
  'General heating',
  1, NULL
)
ON CONFLICT (slug) DO NOTHING;

-- ─── Category links ───────────────────────────────────────────────────────────

DO $$
DECLARE
  c_firewood UUID; c_hardwood UUID; c_softwood UUID;
BEGIN
  SELECT id INTO c_firewood FROM categories WHERE slug = 'firewood-logs';
  SELECT id INTO c_hardwood FROM categories WHERE slug = 'hardwood-logs';
  SELECT id INTO c_softwood FROM categories WHERE slug = 'softwood-logs';

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, c_firewood FROM products p WHERE p.slug = 'mixed-hardwood-softwood-starter-pack' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, c_softwood FROM products p WHERE p.slug = 'mixed-hardwood-softwood-starter-pack' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, c_hardwood FROM products p WHERE p.slug = 'freshly-cut-oak-logs-green-timber' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, c_firewood FROM products p WHERE p.slug = 'freshly-cut-oak-logs-green-timber' ON CONFLICT DO NOTHING;
END $$;

-- ─── SEO ─────────────────────────────────────────────────────────────────────

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Mixed Hardwood Softwood Starter Pack | Emberwood', 'Mixed hardwood and softwood bulk bag — birch and pine blend. Softwood to light, hardwood to last. Approx 0.75m³, kiln-dried.'
FROM products p WHERE p.slug = 'mixed-hardwood-softwood-starter-pack'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Freshly Cut Green Oak Logs Season Yourself | Emberwood', 'Green freshly cut oak logs for home seasoning. Stack and dry for 12–18 months. Significantly cheaper than kiln-dried. Approx 0.75m³.'
FROM products p WHERE p.slug = 'freshly-cut-oak-logs-green-timber'
ON CONFLICT (entity_type, entity_id) DO NOTHING;
