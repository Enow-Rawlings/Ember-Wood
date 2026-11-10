-- =============================================================================
-- Seed 002: Mock products for development and demonstration
-- Run ONLY in development / staging. NEVER in production.
-- These are illustrative placeholder products — not real inventory.
-- Replace with real product data before any public launch.
-- =============================================================================

-- ─── Seed categories first ────────────────────────────────────────────────────

INSERT INTO categories (name, slug, description, is_visible, sort_order) VALUES
  ('Firewood Logs',     'firewood-logs',     'Seasoned and kiln-dried logs for open fireplaces, stoves and fire pits.',     TRUE, 1),
  ('Hardwood Logs',     'hardwood-logs',     'Dense hardwood species for long, slow-burning fires and maximum heat output.', TRUE, 2),
  ('Softwood Logs',     'softwood-logs',     'Fast-lighting softwood for kindling fires quickly or outdoor use.',            TRUE, 3),
  ('Kindling',          'kindling',          'Small splits and bundles for starting fires easily.',                           TRUE, 4),
  ('Logs & Briquettes', 'logs-briquettes',   'Compressed wood briquettes and heat logs for sustained, efficient burning.',   TRUE, 5),
  ('Timber & Wood',     'timber',            'Structural and decorative timber for outdoor and construction projects.',      TRUE, 6)
ON CONFLICT (slug) DO NOTHING;

-- ─── 15 mock products ─────────────────────────────────────────────────────────

INSERT INTO products (
  name, slug, sku, short_description, long_description,
  price, currency, status, is_visible,
  stock_quantity, low_stock_threshold,
  wood_species, wood_type, wood_condition,
  log_length_cm, pack_format, weight_kg, volume_description,
  intended_use, min_order_quantity, sale_price
) VALUES

-- 1
(
  'Seasoned Mixed Hardwood Logs — Bulk Bag',
  'seasoned-mixed-hardwood-bulk-bag',
  'HW-MIX-BB-001',
  'A generous bulk bag of seasoned mixed hardwood logs, ideal for open fireplaces and wood-burning stoves. Air-dried for a minimum of 12 months.',
  'Our seasoned mixed hardwood bulk bag is a popular choice for households that want reliable, long-burning logs at excellent value. The mix typically includes oak, ash and beech — all slow-burning hardwoods that produce a consistent, steady heat.

Logs are air-dried for a minimum of 12 months before packing, which reduces moisture content and improves burn quality. Suitable for open fireplaces, wood-burning stoves and multi-fuel stoves.

Each bulk bag contains approximately 0.75m³ of loosely-packed logs. Actual yield varies naturally with log diameter and split size.',
  189.00, 'GBP', 'published', TRUE,
  24, 5,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 280, 'Approx. 0.75m³ loose fill — enough for approximately 3–4 weeks of regular use',
  'Open fireplace, Wood-burning stove',
  1, 169.00
),

-- 2
(
  'Kiln Dried Oak Logs — Crate',
  'kiln-dried-oak-logs-crate',
  'HW-OAK-CR-001',
  'Premium kiln-dried oak logs in a convenient crate. Ready to burn immediately with consistent, high-heat output.',
  'Oak is one of the most prized firewood species for its exceptional density and long burn time. These logs have been kiln-dried to bring moisture content down, making them ready to burn straight from delivery.

Kiln-dried oak produces minimal smoke, a bright flame and a long-lasting coal bed — ideal for wood-burning stoves and open fireplaces where sustained heat is important.

Delivered in a sturdy wooden crate for easy storage and handling. Logs are approximately 25cm in length and varied in diameter.',
  176.00, 'GBP', 'published', TRUE,
  18, 4,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Crate', 180, 'Approx. 0.6m³ stacked — standard crate size',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 3
(
  'Seasoned Ash Logs — Bulk Bag',
  'seasoned-ash-logs-bulk-bag',
  'HW-ASH-BB-001',
  'Seasoned ash logs are well-known for burning well even with slightly higher moisture content, producing a clean, bright flame.',
  'Ash has long been considered one of the best firewood species — it burns cleanly, splits easily and produces a good, consistent heat. Unlike some hardwoods, ash can burn acceptably even before it is fully seasoned, though we recommend well-dried ash for the best performance.

These logs have been seasoned for at least 12 months and are suitable for wood-burning stoves, multi-fuel stoves and open fireplaces.

The bulk bag contains approximately 0.75m³ of logs at approximately 25cm length.',
  179.00, 'GBP', 'published', TRUE,
  31, 6,
  'Ash', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 260, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Wood-burning stove, Multi-fuel stove',
  1, NULL
),

-- 4
(
  'Hardwood Kindling — Large Net',
  'hardwood-kindling-large-net',
  'KD-HW-LN-001',
  'Generously sized net of hardwood kindling splits. Fast-lighting and ideal for getting a fire started quickly.',
  'Good kindling makes starting a fire straightforward. These hardwood splits are thin enough to catch quickly from a firelighter or match but substantial enough to build a solid base before adding larger logs.

Sourced from our hardwood processing — these are the smaller offcuts and splits from our log preparation. Completely natural, no treatments or additives.

Each large net contains enough kindling for approximately 15–20 fire-starting sessions depending on your technique.',
  8.50, 'GBP', 'published', TRUE,
  120, 15,
  'Mixed hardwood', 'hardwood', 'Air-dried',
  NULL, 'Net bag', 3.5, 'Large net — approx. 3.5kg',
  'General heating, Open fireplace, Wood-burning stove',
  1, NULL
),

-- 5
(
  'Softwood Kindling — Twin Pack',
  'softwood-kindling-twin-pack',
  'KD-SW-TP-001',
  'Two nets of softwood kindling — lights instantly and burns hot to get your fire going fast.',
  'Softwood kindling lights faster than hardwood and is an excellent choice for quickly establishing a fire before loading with larger hardwood logs.

This twin pack gives you great value and enough kindling for a full season of regular fires. Each net contains consistent, evenly-sized splits from dry softwood.

Natural product — no additives, no accelerants. Simply stack loosely under your logs and light.',
  12.99, 'GBP', 'published', TRUE,
  85, 10,
  'Spruce / softwood mix', 'softwood', 'Air-dried',
  NULL, 'Net bag', 6, 'Two nets — approx. 3kg each, 6kg total',
  'General heating, Kindling',
  1, NULL
),

-- 6
(
  'Kiln Dried Birch Logs — Net Bag',
  'kiln-dried-birch-logs-net-bag',
  'HW-BIRCH-NB-001',
  'Kiln-dried birch logs in a convenient net bag. Fast-lighting with a beautiful bright flame and pleasant natural scent.',
  'Birch is loved for its attractive white bark, quick-lighting properties and pleasant natural aroma when burning. It burns faster than oak or ash but produces a cheerful, bright flame that is particularly enjoyable in open fireplaces.

These logs are kiln-dried for immediate use and come in a convenient net bag — perfect for topping up your log store or keeping by the fire for top-up loads.

Approximately 8–10 logs per net depending on size.',
  24.99, 'GBP', 'published', TRUE,
  67, 10,
  'Silver birch', 'hardwood', 'Kiln-dried',
  25, 'Net bag', 8, 'Net bag — approx. 8kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, 22.49
),

-- 7
(
  'Compressed Wood Briquettes — Box of 12',
  'compressed-wood-briquettes-box-12',
  'BR-COMP-B12-001',
  'High-density compressed wood briquettes. Burns longer than standard logs with less ash and a consistent, controllable heat output.',
  'Wood briquettes are made from compressed sawdust and wood shavings — a clean, efficient fuel with a very consistent energy output. They burn longer than natural logs of equivalent size and produce less ash, making them practical for overnight burns and for reducing how often you need to reload your stove.

These briquettes are made from untreated, natural wood residues with no binders or additives. Suitable for wood-burning stoves, multi-fuel stoves and open fireplaces with a suitable grate.

Box of 12 briquettes. Each briquette weighs approximately 1kg.',
  19.99, 'GBP', 'published', TRUE,
  52, 8,
  'Compressed wood residue (untreated)', 'hardwood', 'Kiln-dried',
  NULL, 'Box', 12, 'Box of 12 briquettes — approx. 12kg total',
  'Wood-burning stove, Multi-fuel stove, Open fireplace',
  1, NULL
),

-- 8
(
  'Hardwood Log Pallet — Full',
  'hardwood-log-pallet-full',
  'HW-MIX-PAL-001',
  'A full pallet of seasoned mixed hardwood logs. Maximum value for high-usage homes or those stocking up for the season.',
  'Our full hardwood pallet is the most economical way to buy firewood for homes with a wood-burning stove or fireplace that is used regularly through the colder months.

The pallet contains seasoned mixed hardwood logs — typically oak, ash and beech — and represents a substantial seasonal supply for most households. Logs are approximately 25cm in length and naturally varied in diameter.

Please note: pallet delivery requires suitable access for a delivery vehicle. Please advise us of any access restrictions at the time of ordering.',
  349.00, 'GBP', 'published', TRUE,
  8, 2,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Pallet', 540, 'Full pallet — approx. 1.5m³ stacked',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- 9
(
  'Softwood Logs — Bulk Bag',
  'softwood-logs-bulk-bag',
  'SW-MIX-BB-001',
  'A bulk bag of seasoned softwood logs. Fast-lighting and great for outdoor fires, fire pits and chimineas.',
  'Softwood logs light more readily than hardwood and produce a fast, hot burn — making them ideal for outdoor fire pits, chimineas, garden fires and situations where you want a fire established quickly.

For indoor stoves and fireplaces, softwood can be used to get a fire started before loading with hardwood, or on its own in appliances suited to softwood fuel.

This bulk bag contains approximately 0.75m³ of seasoned softwood logs at approximately 25cm length. Natural variation in log diameter applies.',
  139.00, 'GBP', 'published', TRUE,
  38, 6,
  'Mixed softwood (spruce, pine)', 'softwood', 'Seasoned',
  25, 'Bulk bag', 200, 'Approx. 0.75m³ loose fill',
  'Fire pit, Chiminea, Outdoor use',
  1, 119.00
),

-- 10
(
  'Kiln Dried Mixed Hardwood — Small Crate',
  'kiln-dried-mixed-hardwood-small-crate',
  'HW-MIX-SC-001',
  'A compact crate of kiln-dried mixed hardwood — perfect for occasional use or trying our wood before a larger order.',
  'This small crate is ideal if you use your fire occasionally and want a manageable, easy-to-store quantity of premium kiln-dried hardwood. The mix typically includes oak, ash and beech.

Logs are kiln-dried and ready to burn immediately. The compact crate size fits easily in a log store, garage or utility room.

Approximately 0.3m³ stacked — enough for 10–15 typical fire sessions depending on use.',
  89.00, 'GBP', 'published', TRUE,
  44, 8,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Kiln-dried',
  25, 'Crate', 90, 'Approx. 0.3m³ stacked — small crate',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 11
(
  'Fire Starter Blocks — Pack of 24',
  'fire-starter-blocks-pack-24',
  'FS-BLOCK-24-001',
  'Natural wood-fibre fire starter blocks. Odourless and easy to use — light one block under your kindling to start a reliable fire every time.',
  'These fire starter blocks are made from compressed natural wood fibres and wax — no kerosene, no unpleasant odours. Each block burns for several minutes, giving your kindling plenty of time to catch.

Pack of 24 blocks. Each block is individually wrapped for convenience. Store in a dry location away from heat sources.',
  9.99, 'GBP', 'published', TRUE,
  200, 20,
  NULL, NULL, NULL,
  NULL, 'Box', 0.4, 'Pack of 24 blocks',
  'General heating, Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 12
(
  'Seasoned Oak Logs — Builders Bag',
  'seasoned-oak-logs-builders-bag',
  'HW-OAK-BUILDERS-001',
  'Extra-large builders bag of seasoned oak — maximum quantity for the dedicated wood burner stocking up for a full winter season.',
  'Our builders bag contains a substantial quantity of seasoned oak logs — suited to households with a primary wood-burning heating system or those who simply prefer to stock up once and not worry about reordering mid-season.

Oak is a dense, slow-burning hardwood that produces sustained, high-quality heat. Logs are seasoned for a minimum of 12 months. Log length is approximately 25cm.

Please note: the builders bag is very heavy and requires two people or mechanical assistance to move once delivered. Access for a flatbed delivery vehicle is required.',
  279.00, 'GBP', 'published', TRUE,
  6, 2,
  'Oak', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 600, 'Extra-large builders bag — approx. 1.2m³ loose fill',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 13
(
  'Birch & Ash Mixed Logs — Net Bag',
  'birch-ash-mixed-logs-net-bag',
  'HW-BASH-NB-001',
  'A convenient net bag of mixed birch and ash logs. A versatile everyday firewood choice with good heat output and easy lighting.',
  'Birch and ash are a popular combination — birch lights readily and produces a bright, cheerful flame while ash provides a steadier, longer-burning companion log. Together they make a versatile everyday firewood that suits most appliances.

These logs are seasoned and ready for use. The net bag format is convenient for carrying to the fire or storing in a basket indoors. Approximately 12–15 logs per net.',
  21.99, 'GBP', 'published', TRUE,
  55, 8,
  'Birch and ash', 'hardwood', 'Seasoned',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, 18.99
),

-- 14
(
  'Premium Hardwood Log Bundle — Gift Pack',
  'premium-hardwood-log-bundle-gift',
  'HW-GIFT-BP-001',
  'A beautifully presented hardwood log bundle — the perfect gift for anyone with a wood-burning stove or open fireplace.',
  'This premium gift bundle contains a curated selection of kiln-dried hardwood logs, kindling and fire starter blocks — everything needed to light and enjoy a beautiful fire.

Contents: 10–12 kiln-dried hardwood logs, one large net of kindling, 6 natural fire starter blocks.

Presented in a tied hessian carry sack. A thoughtful and practical gift for housewarming, birthdays or any occasion.',
  39.99, 'GBP', 'published', TRUE,
  30, 5,
  'Mixed premium hardwood', 'hardwood', 'Kiln-dried',
  25, 'Bundle', 8, 'Gift bundle in hessian sack — approx. 8kg',
  'Open fireplace, Wood-burning stove, Fire pit, Chiminea',
  1, NULL
),

-- 15
(
  'Softwood Kindling Sticks — Small Bundle',
  'softwood-kindling-sticks-small',
  'KD-SW-SB-001',
  'Small bundle of thin softwood kindling sticks. Perfect for keeping next to the fireplace for quick, easy fire lighting.',
  'A convenient small bundle of softwood kindling sticks — ideal for keeping in a basket or box beside your fireplace or stove for everyday use.

The thin sticks catch quickly from a match or firelighter and provide a solid base for loading with larger logs. Each bundle contains enough kindling for approximately 6–8 fire-starting sessions.',
  5.99, 'GBP', 'published', TRUE,
  180, 20,
  'Softwood mix', 'softwood', 'Air-dried',
  NULL, 'Bundle', 1.5, 'Small bundle — approx. 1.5kg',
  'General heating, Kindling',
  1, NULL
)
ON CONFLICT (slug) DO NOTHING;

-- ─── Link products to categories ─────────────────────────────────────────────

DO $$
DECLARE
  cat_firewood    UUID; cat_hardwood UUID; cat_softwood UUID;
  cat_kindling    UUID; cat_briquettes UUID; cat_timber UUID;
BEGIN
  SELECT id INTO cat_firewood    FROM categories WHERE slug = 'firewood-logs';
  SELECT id INTO cat_hardwood    FROM categories WHERE slug = 'hardwood-logs';
  SELECT id INTO cat_softwood    FROM categories WHERE slug = 'softwood-logs';
  SELECT id INTO cat_kindling    FROM categories WHERE slug = 'kindling';
  SELECT id INTO cat_briquettes  FROM categories WHERE slug = 'logs-briquettes';
  SELECT id INTO cat_timber      FROM categories WHERE slug = 'timber';

  -- Map products to categories (product_categories junction table)
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_firewood FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-bulk-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'kiln-dried-oak-logs-crate' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'seasoned-ash-logs-bulk-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_kindling FROM products p WHERE p.slug = 'hardwood-kindling-large-net' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_kindling FROM products p WHERE p.slug = 'softwood-kindling-twin-pack' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'kiln-dried-birch-logs-net-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_briquettes FROM products p WHERE p.slug = 'compressed-wood-briquettes-box-12' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'hardwood-log-pallet-full' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_softwood FROM products p WHERE p.slug = 'softwood-logs-bulk-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-small-crate' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_kindling FROM products p WHERE p.slug = 'fire-starter-blocks-pack-24' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'seasoned-oak-logs-builders-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'birch-ash-mixed-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_firewood FROM products p WHERE p.slug = 'birch-ash-mixed-logs-net-bag' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_hardwood FROM products p WHERE p.slug = 'premium-hardwood-log-bundle-gift' ON CONFLICT DO NOTHING;

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_kindling FROM products p WHERE p.slug = 'softwood-kindling-sticks-small' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, cat_softwood FROM products p WHERE p.slug = 'softwood-kindling-sticks-small' ON CONFLICT DO NOTHING;
END $$;

-- ─── SEO records ──────────────────────────────────────────────────────────────
-- One SEO record per product. Titles ≤ 70 chars, descriptions ≤ 160 chars.

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Hardwood Logs Bulk Bag | Emberwood', 'Seasoned mixed hardwood logs in a bulk bag. Air-dried 12+ months. Oak, ash and beech mix for long-burning heat. Approx 0.75m³. Order online today.'
FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-bulk-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Logs in Crate | Emberwood', 'Premium kiln-dried oak logs in a sturdy crate. Ready to burn with minimal smoke and long-lasting heat. Approx 0.6m³. Ideal for wood-burning stoves.'
FROM products p WHERE p.slug = 'kiln-dried-oak-logs-crate'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Ash Logs Bulk Bag | Emberwood', 'Seasoned ash logs in a bulk bag. Burns cleanly with a bright flame. Suitable for stoves, fireplaces and multi-fuel appliances. Approx 0.75m³.'
FROM products p WHERE p.slug = 'seasoned-ash-logs-bulk-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Kindling Large Net | Emberwood', 'Large net of hardwood kindling splits for fast, reliable fire starting. Natural, untreated wood. Approx 3.5kg per net.'
FROM products p WHERE p.slug = 'hardwood-kindling-large-net'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Softwood Kindling Twin Pack | Emberwood', 'Two nets of softwood kindling that lights instantly and burns hot. Perfect for getting fires going fast. Approx 6kg total.'
FROM products p WHERE p.slug = 'softwood-kindling-twin-pack'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Birch Logs Net Bag | Emberwood', 'Kiln-dried birch logs in a handy net bag. Quick-lighting with a bright flame and pleasant aroma. Approx 8kg. Ready to burn.'
FROM products p WHERE p.slug = 'kiln-dried-birch-logs-net-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Wood Briquettes Box of 12 | Emberwood', 'High-density compressed wood briquettes. Burns longer than logs with less ash. No additives. Box of 12, approx 12kg.'
FROM products p WHERE p.slug = 'compressed-wood-briquettes-box-12'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Log Pallet Full | Emberwood', 'Full pallet of seasoned mixed hardwood logs. Best value for regular burners. Approx 1.5m³. Seasonal supply for high-usage homes.'
FROM products p WHERE p.slug = 'hardwood-log-pallet-full'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Softwood Logs Bulk Bag | Emberwood', 'Bulk bag of seasoned softwood logs. Fast-lighting and ideal for fire pits, chimineas and outdoor fires. Approx 0.75m³.'
FROM products p WHERE p.slug = 'softwood-logs-bulk-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Hardwood Small Crate | Emberwood', 'Compact crate of kiln-dried mixed hardwood. Ready to burn, easy to store. Approx 0.3m³. Perfect for occasional use.'
FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-small-crate'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Fire Starter Blocks Pack of 24 | Emberwood', 'Natural wood-fibre fire starter blocks. Odourless and easy to use. One block under kindling for a reliable fire every time.'
FROM products p WHERE p.slug = 'fire-starter-blocks-pack-24'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Oak Logs Builders Bag | Emberwood', 'Extra-large builders bag of seasoned oak logs. Maximum quantity for a full winter season. Dense, slow-burning hardwood. Approx 1.2m³.'
FROM products p WHERE p.slug = 'seasoned-oak-logs-builders-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Birch and Ash Mixed Logs Net Bag | Emberwood', 'Net bag of mixed birch and ash logs. Birch lights fast, ash burns steady. Versatile everyday firewood. Approx 10kg.'
FROM products p WHERE p.slug = 'birch-ash-mixed-logs-net-bag'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Log Gift Bundle | Emberwood', 'Premium gift bundle with kiln-dried hardwood logs, kindling and fire starters. Presented in a hessian sack. Approx 8kg.'
FROM products p WHERE p.slug = 'premium-hardwood-log-bundle-gift'
ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Softwood Kindling Sticks Bundle | Emberwood', 'Small bundle of softwood kindling sticks for quick, easy fire lighting. Keep by the fireplace for everyday use. Approx 1.5kg.'
FROM products p WHERE p.slug = 'softwood-kindling-sticks-small'
ON CONFLICT (entity_type, entity_id) DO NOTHING;
