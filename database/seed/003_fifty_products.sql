-- =============================================================================
-- Seed 003: 50 firewood products with SEO-optimised categories
-- Idempotent — uses ON CONFLICT DO NOTHING throughout.
-- Run ONLY in development / staging. NEVER in production without review.
-- =============================================================================

-- ─── Expanded SEO-friendly categories ─────────────────────────────────────────

INSERT INTO categories (name, slug, description, is_visible, sort_order) VALUES
  ('Kiln Dried Logs',         'kiln-dried-logs',          'Ready-to-burn kiln-dried hardwood and softwood logs with moisture content below 20%. Perfect for wood-burning stoves and open fireplaces.',  TRUE,  1),
  ('Seasoned Hardwood Logs',  'seasoned-hardwood-logs',   'Air-seasoned hardwood logs from oak, ash, beech and birch. Naturally dried for 12–24 months for a clean, long-lasting burn.',               TRUE,  2),
  ('Hardwood Logs',           'hardwood-logs',            'Dense hardwood species for long, slow-burning fires and maximum heat output.',                                                                TRUE,  3),
  ('Softwood Logs',           'softwood-logs',            'Fast-lighting softwood for kindling fires quickly or outdoor use.',                                                                           TRUE,  4),
  ('Kindling & Fire Starters','kindling-fire-starters',   'Hardwood and softwood kindling bundles, natural fire lighters and fire starter blocks for quick, reliable fire lighting.',                   TRUE,  5),
  ('Bulk Firewood Deals',     'bulk-firewood-deals',      'Best-value bulk bags, crates and pallets of firewood for homes that burn regularly. Stock up for the season and save.',                      TRUE,  6),
  ('Firewood for Stoves',     'firewood-for-stoves',      'Firewood suited to wood-burning stoves, multi-fuel stoves and log burners. Low moisture, correct size, maximum efficiency.',                 TRUE,  7),
  ('Firewood for Fire Pits',  'firewood-fire-pits',       'Seasoned and dried firewood perfect for outdoor fire pits, chimineas and garden fires. Fast-lighting with good flame.',                      TRUE,  8),
  ('Premium Hardwood',        'premium-hardwood',         'Top-grade kiln-dried oak, ash and elm — the finest firewood for discerning customers who want the best burn quality and longevity.',         TRUE,  9),
  ('Logs & Briquettes',       'logs-briquettes',          'Compressed wood briquettes and heat logs for sustained, efficient burning.',                                                                  TRUE, 10),
  ('Firewood Logs',           'firewood-logs',            'Seasoned and kiln-dried logs for open fireplaces, stoves and fire pits.',                                                                    TRUE, 11),
  ('Kindling',                'kindling',                 'Small splits and bundles for starting fires easily.',                                                                                         TRUE, 12),
  ('Timber & Wood',           'timber',                   'Structural and decorative timber for outdoor and construction projects.',                                                                     TRUE, 13)
ON CONFLICT (slug) DO NOTHING;

-- ─── 50 products ──────────────────────────────────────────────────────────────

INSERT INTO products (
  name, slug, sku, short_description, long_description,
  price, currency, status, is_visible,
  stock_quantity, low_stock_threshold,
  wood_species, wood_type, wood_condition,
  log_length_cm, pack_format, weight_kg, volume_description,
  intended_use, min_order_quantity, sale_price
) VALUES

-- ─── KILN DRIED HARDWOOD — Bulk Bags ─────────────────────────────────────────

-- 1
(
  'Kiln Dried Oak Logs — Large Bulk Bag',
  'kiln-dried-oak-logs-large-bulk-bag',
  'KD-OAK-LBB-001',
  'Premium kiln-dried oak in a generously filled bulk bag. Ready to burn immediately with deep, long-lasting heat output.',
  'Oak is the benchmark firewood species — exceptionally dense, slow-burning and producing a sustained, intense heat that outlasts almost every other wood. This large bulk bag is kiln-dried to bring moisture content well below 20%, making it ready to use straight from delivery.

Kiln-dried oak produces very little smoke, a bright amber flame and an outstanding coal bed that keeps your stove or fireplace radiating long after the flames have settled. Ideal for evening fires where you want continuous warmth without constant reloading.

Logs are approximately 25cm in length — the most common size for wood-burning stoves — and naturally varied in diameter for good air circulation.',
  229.00, 'GBP', 'published', TRUE,
  18, 3,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 320, 'Large bulk bag — approx. 1.0m³ loose fill',
  'Wood-burning stove, Open fireplace',
  1, 199.00
),

-- 2
(
  'Kiln Dried Ash Logs — Bulk Bag',
  'kiln-dried-ash-logs-bulk-bag',
  'KD-ASH-BB-001',
  'Kiln-dried ash logs in a standard bulk bag. Ash burns clean and bright, with one of the best heat outputs of any UK native species.',
  'Ash is widely regarded as the ideal everyday firewood — it burns reliably, lights easily and produces a consistent, clean heat with minimal sparking. When kiln-dried, ash performs even better: lower moisture means higher combustion efficiency and far less creosote build-up in your flue.

These logs are kiln-dried to below 20% moisture content and arrive ready to burn. The bulk bag contains approximately 0.75m³ of loosely packed logs at 25cm length — enough for three to four weeks of regular use in most households.',
  195.00, 'GBP', 'published', TRUE,
  25, 4,
  'Ash', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 270, 'Approx. 0.75m³ loose fill',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- 3
(
  'Kiln Dried Birch Logs — Bulk Bag',
  'kiln-dried-birch-logs-bulk-bag',
  'KD-BIRCH-BB-001',
  'Kiln-dried silver birch logs in a bulk bag. Birch lights fast, burns bright and fills a room with a beautiful, cheerful flame.',
  'Silver birch is a favourite for open fireplaces and fire pits — its distinctive white bark, fast-lighting nature and attractive flame make it one of the most enjoyable firewoods to burn. While it burns faster than oak or ash, the experience it delivers is second to none for ambience.

These logs are kiln-dried for immediate use and packed at approximately 25cm length. The bulk bag contains approximately 0.75m³ — perfect for stocking up and enjoying throughout the season.',
  185.00, 'GBP', 'published', TRUE,
  22, 4,
  'Silver birch', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 255, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 4
(
  'Kiln Dried Beech Logs — Bulk Bag',
  'kiln-dried-beech-logs-bulk-bag',
  'KD-BEECH-BB-001',
  'Kiln-dried beech logs deliver outstanding heat and a steady, even burn. A premium choice for wood-burning stove owners.',
  'Beech is one of the finest firewood species available — dense, clean-burning and long-lasting. It produces a steady, even heat that is excellent for extended burns in wood-burning stoves and multi-fuel appliances. Beech burns with a subtle, pleasant aroma and produces minimal ash.

Kiln-dried to below 20% moisture, this bulk bag arrives ready to use immediately. Approximately 0.75m³ at 25cm log length — a solid season supply for moderate use.',
  199.00, 'GBP', 'published', TRUE,
  20, 3,
  'Beech', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 275, 'Approx. 0.75m³ loose fill',
  'Wood-burning stove, Multi-fuel stove, Open fireplace',
  1, NULL
),

-- 5
(
  'Kiln Dried Hornbeam Logs — Bulk Bag',
  'kiln-dried-hornbeam-logs-bulk-bag',
  'KD-HORN-BB-001',
  'Hornbeam is one of the densest and hardest native British hardwoods — it burns slowly, generates exceptional heat and lasts far longer than most species.',
  'Hornbeam (Carpinus betulus) is the heavyweight of British firewood. Denser than oak, it burns extremely slowly and generates sustained, intense heat — making it outstanding value for money on a heat-per-log basis. It is less well known than oak or ash but highly regarded by experienced wood burners.

Kiln-dried to below 20% moisture. Logs are approximately 25cm in length. Bulk bag contains approximately 0.75m³. Expect noticeably longer burn times compared to most other species.',
  209.00, 'GBP', 'published', TRUE,
  14, 3,
  'Hornbeam', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 290, 'Approx. 0.75m³ loose fill',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- ─── SEASONED HARDWOOD — Bulk Bags ───────────────────────────────────────────

-- 6
(
  'Seasoned Oak Logs — Bulk Bag',
  'seasoned-oak-logs-bulk-bag',
  'SEA-OAK-BB-001',
  'Air-seasoned oak logs in a standard bulk bag. Seasoned for 18+ months for a reliable, steady burn at excellent value.',
  'Our seasoned oak bulk bag is an outstanding choice for households who want the quality of oak without the premium of kiln-drying. These logs have been air-seasoned for a minimum of 18 months, achieving a good moisture level for reliable burning.

Seasoned oak produces a long, steady burn with good heat output and a satisfying, traditional fire experience. Suitable for open fireplaces, wood-burning stoves and multi-fuel appliances.

Logs are approximately 25cm in length. The bulk bag contains approximately 0.75m³ — typically enough for 3–4 weeks of regular evening fires.',
  175.00, 'GBP', 'published', TRUE,
  30, 5,
  'Oak', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 280, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Wood-burning stove',
  1, 159.00
),

-- 7
(
  'Seasoned Elm Logs — Bulk Bag',
  'seasoned-elm-logs-bulk-bag',
  'SEA-ELM-BB-001',
  'Seasoned elm logs are dense and long-burning with a subtle, sweet aroma when burned. An underrated species prized by experienced burners.',
  'Elm is one of the more unusual British firewoods — dense, slow-burning and producing a pleasantly sweet smoke that many find more aromatic than oak. It requires good seasoning to burn well, but once dried it delivers excellent heat output and longevity.

These logs have been seasoned for a minimum of 24 months. Elm benefits from longer seasoning than most hardwoods due to its high initial moisture content. The result is a reliable, long-lasting fire with a distinctive character.

Approximately 25cm log length. Bulk bag contains approximately 0.75m³.',
  179.00, 'GBP', 'published', TRUE,
  18, 3,
  'Elm', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 285, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Wood-burning stove',
  1, NULL
),

-- 8
(
  'Seasoned Cherry Logs — Bulk Bag',
  'seasoned-cherry-logs-bulk-bag',
  'SEA-CHERRY-BB-001',
  'Seasoned cherry logs burn with a beautiful aroma and a lovely warm flame. Ideal for open fireplaces where scent and ambience matter.',
  'Cherry firewood is prized for two things: its attractive reddish-tinted flame and the delightful, mild fruity aroma it releases when burning. It burns cleanly with moderate heat output and is an excellent choice for open fireplaces and living room fires where the experience matters as much as pure warmth.

Seasoned for 12–18 months. Cherry burns faster than oak but produces noticeably more aromatic smoke — a popular choice for occasional fires and social occasions.

Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  189.00, 'GBP', 'published', TRUE,
  16, 3,
  'Wild cherry', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 260, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Fire pit, Chiminea',
  1, NULL
),

-- 9
(
  'Seasoned Apple Wood Logs — Bulk Bag',
  'seasoned-apple-wood-logs-bulk-bag',
  'SEA-APPLE-BB-001',
  'Apple wood is a premium aromatic firewood — it burns slowly with a sweet, distinctive scent beloved by open fireplace enthusiasts.',
  'Apple wood is among the most sought-after aromatic firewoods. It burns slowly and evenly, producing excellent heat and a wonderfully sweet, distinctive fragrance that transforms an open fireplace into a truly sensory experience.

Sourced from orchard prunings and managed apple trees, this is a genuinely premium product that many customers return to year after year. It burns with less spark than many fruitwoods and produces very little ash.

Seasoned for 18+ months. Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  215.00, 'GBP', 'published', TRUE,
  12, 2,
  'Apple', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 255, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Chiminea, Fire pit',
  1, NULL
),

-- 10
(
  'Seasoned Walnut Logs — Bulk Bag',
  'seasoned-walnut-logs-bulk-bag',
  'SEA-WALNUT-BB-001',
  'Walnut firewood burns with an earthy, rich aroma and produces outstanding heat. A rare and premium choice for discerning fireplace owners.',
  'Walnut is a rare and luxurious firewood choice. It burns slowly with a rich, earthy aroma, produces high heat output and leaves very little ash. The colour of the flame is particularly attractive — a deep, warm orange.

Walnut logs are sourced from managed woodland thinnings and timber yard offcuts. Availability is limited due to the high commercial value of walnut timber, making this a genuinely premium product.

Seasoned 18–24 months. Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  235.00, 'GBP', 'published', TRUE,
  8, 2,
  'Walnut', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 270, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Wood-burning stove',
  1, NULL
),

-- ─── KILN DRIED CRATES ────────────────────────────────────────────────────────

-- 11
(
  'Kiln Dried Oak Logs — Large Crate',
  'kiln-dried-oak-logs-large-crate',
  'KD-OAK-LC-001',
  'Premium kiln-dried oak in a large crate. The easiest, tidiest way to store a generous quantity of ready-to-burn oak.',
  'This large crate of kiln-dried oak is ideal for customers who prefer a tidy, stackable delivery format over a bulk bag. The crate can be stored directly in a garage, outbuilding or log store without the need to transfer logs.

Premium kiln-dried oak with moisture content below 20%. Long, steady burns with high heat output. Approximately 25cm log length. Crate contains approximately 1.0m³ stacked — a substantial supply for a home that burns regularly.',
  259.00, 'GBP', 'published', TRUE,
  12, 2,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Crate', 220, 'Approx. 1.0m³ stacked — large crate',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 12
(
  'Kiln Dried Ash Logs — Large Crate',
  'kiln-dried-ash-logs-large-crate',
  'KD-ASH-LC-001',
  'Kiln-dried ash logs delivered in a sturdy large crate. Ready to burn, clean heat, easy to store.',
  'Ash is widely considered the best all-round firewood species — clean-burning, easy to light and producing a good steady heat. This large crate of kiln-dried ash is delivered ready to burn, with moisture content below 20%.

The crate format makes delivery, storage and access straightforward — no need to shovel logs from a bag. Approximately 25cm log length. Contains approximately 1.0m³ stacked.',
  239.00, 'GBP', 'published', TRUE,
  15, 3,
  'Ash', 'hardwood', 'Kiln-dried',
  25, 'Crate', 215, 'Approx. 1.0m³ stacked — large crate',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- 13
(
  'Kiln Dried Mixed Hardwood — Large Crate',
  'kiln-dried-mixed-hardwood-large-crate',
  'KD-MIX-LC-001',
  'A large crate of kiln-dried mixed hardwood — oak, ash and beech — for maximum value and variety.',
  'This large mixed hardwood crate combines the best of our kiln-dried range: oak for longevity, ash for clean burning and beech for steady heat. The blend gives an excellent all-round fire that works well in both stoves and open fireplaces.

Kiln-dried below 20% moisture. Approximately 25cm log length. Approximately 1.0m³ stacked — a generous supply for heavy burners or those stocking up early in the season.',
  245.00, 'GBP', 'published', TRUE,
  16, 3,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Kiln-dried',
  25, 'Crate', 210, 'Approx. 1.0m³ stacked — large crate',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- ─── PALLETS & BUILDERS BAGS ──────────────────────────────────────────────────

-- 14
(
  'Kiln Dried Oak — Full Season Pallet',
  'kiln-dried-oak-full-season-pallet',
  'KD-OAK-PAL-001',
  'A full pallet of kiln-dried oak — the ultimate seasonal stock-up for homes that burn wood as a primary heat source.',
  'This full pallet of kiln-dried oak is designed for serious wood burners — households that rely on their stove or fireplace as a primary or significant heat source throughout the colder months.

Premium kiln-dried oak with moisture below 20%. Each pallet contains approximately 2.0m³ stacked — typically enough for 8–12 weeks of heavy use depending on appliance and usage pattern.

Please ensure access is available for a flatbed delivery vehicle. The pallet can be wrapped for outdoor storage if needed.',
  549.00, 'GBP', 'published', TRUE,
  6, 2,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Pallet', 760, 'Full pallet — approx. 2.0m³ stacked',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 15
(
  'Kiln Dried Ash — Full Season Pallet',
  'kiln-dried-ash-full-season-pallet',
  'KD-ASH-PAL-001',
  'Full pallet of premium kiln-dried ash. The most cost-effective way to buy quality ready-to-burn firewood for a full season.',
  'Kiln-dried ash in a full seasonal pallet — the best price-per-cubic-metre we offer and the most popular choice for customers who heat their home primarily with wood.

Ash is widely regarded as the best all-round firewood species. This pallet contains approximately 2.0m³ stacked, kiln-dried below 20% moisture. Suitable for wood-burning stoves, multi-fuel stoves and open fireplaces.

Flatbed vehicle access required at the delivery address.',
  519.00, 'GBP', 'published', TRUE,
  7, 2,
  'Ash', 'hardwood', 'Kiln-dried',
  25, 'Pallet', 730, 'Full pallet — approx. 2.0m³ stacked',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- 16
(
  'Seasoned Mixed Hardwood — Builders Bag (XL)',
  'seasoned-mixed-hardwood-builders-bag-xl',
  'SEA-MIX-XL-001',
  'Extra-large builders bag of seasoned mixed hardwood — the maximum quantity we offer in a single bag. Outstanding value for high-usage homes.',
  'Our XL builders bag is the most economical way to buy seasoned firewood. It contains approximately 1.5m³ of loosely packed mixed hardwood logs — typically oak, ash and beech — seasoned for a minimum of 12 months.

This is the right choice if you have a primary wood-burning heating system or a large open fireplace that you use intensively. Bags are very heavy — mechanical assistance or two people are required to move once delivered.',
  319.00, 'GBP', 'published', TRUE,
  8, 2,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 650, 'Extra-large builders bag — approx. 1.5m³ loose fill',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- ─── NET BAGS & SMALL QUANTITIES ──────────────────────────────────────────────

-- 17
(
  'Kiln Dried Oak Logs — Net Bag',
  'kiln-dried-oak-logs-net-bag',
  'KD-OAK-NB-001',
  'A convenient net bag of kiln-dried oak logs. Perfect for topping up your log store or as a trial before a larger order.',
  'This net bag of kiln-dried oak is ideal for occasional burners or those wanting to try before committing to a bulk order. Kiln-dried below 20% moisture and ready to burn immediately.

Oak provides one of the longest, steadiest burns of any firewood species — excellent in both stoves and open fireplaces. Approximately 8–10 logs per net at 25cm length.',
  28.99, 'GBP', 'published', TRUE,
  85, 12,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 18
(
  'Kiln Dried Ash Logs — Net Bag',
  'kiln-dried-ash-logs-net-bag',
  'KD-ASH-NB-001',
  'Kiln-dried ash logs in a handy net bag. Great for carrying to the fire or keeping as a top-up supply.',
  'A convenient net bag of kiln-dried ash — ready to burn immediately with clean, steady heat. Ash is one of the most versatile firewoods and performs well in stoves, fireplaces and multi-fuel appliances.

Each net contains approximately 10kg of logs at 25cm length. Perfect for occasional use or as a supplement to a bulk delivery.',
  24.99, 'GBP', 'published', TRUE,
  90, 12,
  'Ash', 'hardwood', 'Kiln-dried',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- 19
(
  'Kiln Dried Beech Logs — Net Bag',
  'kiln-dried-beech-logs-net-bag',
  'KD-BEECH-NB-001',
  'Kiln-dried beech logs in a convenient net bag — steady, even burning with minimal ash and outstanding heat output.',
  'Beech is a consistently excellent firewood — dense, clean-burning and producing steady heat without excessive smoke. These kiln-dried logs are ready to use immediately.

Each net bag contains approximately 10kg at 25cm log length. Beech burns well in both stoves and open fireplaces, producing a classic clean fire with very little residue.',
  25.99, 'GBP', 'published', TRUE,
  80, 12,
  'Beech', 'hardwood', 'Kiln-dried',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 20
(
  'Mixed Hardwood Logs — Net Bag 3-Pack',
  'mixed-hardwood-logs-net-bag-3pack',
  'MIX-HW-NB3-001',
  'Three nets of kiln-dried mixed hardwood logs — excellent value multipack for regular burners who prefer net bag convenience.',
  'Get three net bags of kiln-dried mixed hardwood — typically oak, ash and beech — at a price that reflects the volume discount. Each bag is approximately 10kg at 25cm length, ready to burn immediately.

This three-pack is a popular choice for customers who enjoy the net bag format but want to minimise delivery frequency. Store in a cool, dry place.',
  69.99, 'GBP', 'published', TRUE,
  60, 10,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Kiln-dried',
  25, 'Net bag', 30, '3 × net bags — approx. 10kg each, 30kg total',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- ─── KINDLING ─────────────────────────────────────────────────────────────────

-- 21
(
  'Premium Hardwood Kindling — Large Box',
  'premium-hardwood-kindling-large-box',
  'KD-HW-BX-001',
  'A large box of premium kiln-dried hardwood kindling. Perfectly sized splits that catch quickly and build a solid fire base every time.',
  'Good kindling is the foundation of a good fire. These premium hardwood splits are sized specifically for fire lighting — thin enough to catch from a single firelighter but substantial enough to build a proper base before you add larger logs.

Kiln-dried for consistent, reliable performance in all conditions. The large box contains enough kindling for approximately 25–35 fire-lighting sessions depending on technique and appliance.',
  18.99, 'GBP', 'published', TRUE,
  150, 20,
  'Mixed hardwood', 'hardwood', 'Kiln-dried',
  NULL, 'Box', 5, 'Large box — approx. 5kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 22
(
  'Softwood Kindling — Large Net',
  'softwood-kindling-large-net',
  'SW-KD-LN-001',
  'Large net of dry softwood kindling splits. Lights instantly and burns hot — the fastest way to get any fire going.',
  'Softwood kindling catches faster than hardwood and is an excellent tool for getting a fire established quickly before loading with larger logs. These splits are from dry, treated-free softwood — completely natural.

The large net contains enough kindling for approximately 20–25 fire-lighting sessions. For best results, stack loosely over a firelighter or paper and light before adding hardwood logs.',
  12.99, 'GBP', 'published', TRUE,
  180, 25,
  'Softwood mix', 'softwood', 'Air-dried',
  NULL, 'Net bag', 4, 'Large net — approx. 4kg',
  'Wood-burning stove, Open fireplace, Fire pit',
  1, NULL
),

-- 23
(
  'Hardwood Kindling — 5-Pack Nets',
  'hardwood-kindling-5pack-nets',
  'HW-KD-5N-001',
  'Five nets of hardwood kindling — the best value kindling multipack. Never run out during the burning season.',
  'Five large nets of hardwood kindling splits — a popular choice for customers who go through kindling quickly or want the reassurance of a full season supply in one delivery.

Hardwood kindling burns slightly slower than softwood, giving more time to build a proper fire base before the flames develop. Each net is approximately 3.5kg. 5-pack total approximately 17.5kg.',
  54.99, 'GBP', 'published', TRUE,
  70, 10,
  'Mixed hardwood', 'hardwood', 'Air-dried',
  NULL, 'Net bag', 17.5, '5 × nets — approx. 3.5kg each',
  'Wood-burning stove, Open fireplace, General heating',
  1, NULL
),

-- 24
(
  'Natural Wood Wool Fire Lighters — Box of 100',
  'natural-wood-wool-fire-lighters-100',
  'FS-WOOL-100-001',
  'Natural wood wool fire lighters — odourless, wax-free and highly effective. Light one under your kindling for a reliable fire every time.',
  'These natural wood wool fire lighters are made from compressed wood fibres — no kerosene, no paraffin, no unpleasant smells. Each lighter burns for 8–10 minutes, giving your kindling ample time to catch fully before you add logs.

Box of 100 lighters, individually wrapped for convenience. Compatible with all open fireplaces, wood-burning stoves and fire pits. Store in a dry location.',
  14.99, 'GBP', 'published', TRUE,
  220, 30,
  NULL, NULL, NULL,
  NULL, 'Box', 0.6, 'Box of 100 fire lighters',
  'Open fireplace, Wood-burning stove, Fire pit, General heating',
  1, NULL
),

-- 25
(
  'Eco Fire Starter Blocks — Pack of 48',
  'eco-fire-starter-blocks-48',
  'FS-ECO-48-001',
  'Double-sized pack of eco fire starter blocks. Made from natural wood fibres and wax with no petroleum-based ingredients.',
  'Our best-value fire starter pack — 48 blocks of natural, clean-burning fire starters. Made from compressed wood fibres and food-grade wax, these blocks leave no unpleasant odour and are suitable for use with all appliances.

Each block burns for 6–8 minutes. Stack one or two under your kindling and light. Pack of 48 individually wrapped blocks.',
  16.99, 'GBP', 'published', TRUE,
  180, 25,
  NULL, NULL, NULL,
  NULL, 'Box', 0.8, 'Pack of 48 blocks',
  'Open fireplace, Wood-burning stove, Fire pit, Chiminea',
  1, NULL
),

-- ─── BRIQUETTES & COMPRESSED LOGS ────────────────────────────────────────────

-- 26
(
  'Premium Hardwood Briquettes — Box of 24',
  'premium-hardwood-briquettes-box-24',
  'BR-HW-B24-001',
  'Double pack of premium compressed hardwood briquettes. Burns longer than natural logs with consistent heat and far less ash.',
  'Our large box of 24 hardwood briquettes is ideal for stove owners who prefer the consistency and convenience of compressed fuel. Each briquette is made from compressed hardwood sawdust — no binders, no additives, just pure compressed wood.

24 briquettes at approximately 1kg each. Expected burn time per briquette in a well-sealed stove: 1.5–2.5 hours. Very low ash production. Suitable for wood-burning stoves, multi-fuel stoves and open fireplaces with a suitable grate.',
  36.99, 'GBP', 'published', TRUE,
  90, 12,
  'Compressed hardwood residue', 'hardwood', 'Kiln-dried',
  NULL, 'Box', 24, 'Box of 24 briquettes — approx. 24kg',
  'Wood-burning stove, Multi-fuel stove, Open fireplace',
  1, NULL
),

-- 27
(
  'Peat-Free Heat Logs — Box of 12',
  'peat-free-heat-logs-box-12',
  'HL-PF-B12-001',
  'Dense, slow-burning heat logs made entirely from compressed recycled wood — peat-free, chemical-free and environmentally responsible.',
  'These heat logs are made from 100% recycled compressed wood with no peat, no coal, no chemical binders. They burn cleaner than coal briquettes and significantly longer than natural logs of equivalent size.

Box of 12 logs, each approximately 1.2kg. Suitable for wood-burning stoves, multi-fuel stoves and open fireplaces with a good grate. Very low smoke and ash — ideal for areas with clean air zone requirements.',
  22.99, 'GBP', 'published', TRUE,
  120, 15,
  'Recycled compressed wood', 'hardwood', 'Kiln-dried',
  NULL, 'Box', 14.4, 'Box of 12 heat logs — approx. 14.4kg',
  'Wood-burning stove, Multi-fuel stove, Open fireplace',
  1, NULL
),

-- 28
(
  'Hardwood Briquettes — Pallet (20 Boxes)',
  'hardwood-briquettes-pallet-20-boxes',
  'BR-HW-PAL-001',
  'Full pallet of 20 boxes of hardwood briquettes — maximum value for stove owners who use briquettes as a primary fuel.',
  'Twenty boxes of premium hardwood briquettes — a full pallet representing the best price per briquette we offer. Each box contains 12 briquettes at approximately 1kg each. Total pallet: 240 briquettes, 240kg.

Ideal for customers who run wood-burning stoves or multi-fuel stoves as a primary heating source and prefer the consistency and cleanliness of compressed fuel over natural logs.',
  349.00, 'GBP', 'published', TRUE,
  5, 1,
  'Compressed hardwood residue', 'hardwood', 'Kiln-dried',
  NULL, 'Pallet', 240, 'Pallet of 20 boxes — 240 briquettes total',
  'Wood-burning stove, Multi-fuel stove',
  1, NULL
),

-- ─── SOFTWOOD PRODUCTS ────────────────────────────────────────────────────────

-- 29
(
  'Kiln Dried Scots Pine Logs — Bulk Bag',
  'kiln-dried-scots-pine-logs-bulk-bag',
  'KD-PINE-BB-001',
  'Kiln-dried Scots pine logs — fast-lighting, fragrant and ideal for outdoor fires, fire pits and chimineas.',
  'Scots pine is a classic softwood firewood — it lights quickly, burns with a bright crackling flame and releases a subtle, pleasant pine resin scent. It burns faster than hardwood but produces a lively, atmospheric fire that is perfect for outdoor use.

These logs are kiln-dried for immediate use. Suitable for fire pits, chimineas, garden fires and as an indoor fire starter before loading with hardwood. Not recommended for extended indoor burning due to resin content — use a stove with a suitable flue.

Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  149.00, 'GBP', 'published', TRUE,
  35, 6,
  'Scots pine', 'softwood', 'Kiln-dried',
  25, 'Bulk bag', 195, 'Approx. 0.75m³ loose fill',
  'Fire pit, Chiminea, Outdoor use',
  1, NULL
),

-- 30
(
  'Seasoned Larch Logs — Bulk Bag',
  'seasoned-larch-logs-bulk-bag',
  'SEA-LARCH-BB-001',
  'Seasoned larch logs — a dense, resinous softwood that burns hotter than most softwoods and is excellent for getting large fires going quickly.',
  'Larch is one of the better softwood firewoods — denser than spruce or pine, it burns with more sustained heat and is less prone to spitting. It makes an excellent fire-lighting wood before loading with hardwood, or for outdoor fires where fast, hot burning is the priority.

Seasoned for 12+ months. Approximately 25cm log length. Bulk bag approximately 0.75m³. Recommended for use with a fireguard indoors due to occasional spitting.',
  135.00, 'GBP', 'published', TRUE,
  28, 5,
  'Larch', 'softwood', 'Seasoned',
  25, 'Bulk bag', 185, 'Approx. 0.75m³ loose fill',
  'Fire pit, Outdoor use, Open fireplace',
  1, NULL
),

-- ─── GIFT SETS & BUNDLES ──────────────────────────────────────────────────────

-- 31
(
  'Premium Firewood Gift Set — Deluxe',
  'premium-firewood-gift-set-deluxe',
  'GIFT-DLX-001',
  'A premium gift set containing kiln-dried oak logs, hardwood kindling, natural fire starters and a jute carry sack — the perfect gift for any fire owner.',
  'Our deluxe firewood gift set contains everything needed for a perfect fire, beautifully presented in a natural jute carry sack.

Contents:
- 10–12 kiln-dried oak logs (25cm)
- 1 large net of hardwood kindling
- 10 natural wood wool fire lighters

This is our most popular gift — suitable for housewarming, birthday, Christmas and any occasion where you want to give something genuinely useful and luxurious. The jute sack doubles as a log carrier.',
  54.99, 'GBP', 'published', TRUE,
  40, 6,
  'Oak / mixed hardwood', 'hardwood', 'Kiln-dried',
  25, 'Bundle', 10, 'Gift set in jute carry sack — approx. 10kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 32
(
  'Firewood Starter Bundle — Stove Pack',
  'firewood-starter-bundle-stove-pack',
  'GIFT-STOVE-001',
  'Everything you need to light and run a wood-burning stove — a practical and thoughtful gift for new stove owners.',
  'The perfect gift for someone who has just had a wood-burning stove installed, or for a first-time wood burner. This carefully assembled pack contains:

- 10–12 kiln-dried ash logs (25cm) — the ideal stove fuel
- 1 net of hardwood kindling
- 6 eco fire starter blocks

Ash is considered the best all-round stove fuel — clean-burning, easy to light and efficient. This pack gives a new stove owner everything they need to light and enjoy their first fires with confidence.',
  44.99, 'GBP', 'published', TRUE,
  45, 6,
  'Ash / mixed hardwood', 'hardwood', 'Kiln-dried',
  25, 'Bundle', 8, 'Stove starter bundle — approx. 8kg',
  'Wood-burning stove',
  1, NULL
),

-- 33
(
  'Aromatic Wood Selection Gift Box',
  'aromatic-wood-selection-gift-box',
  'GIFT-AROM-001',
  'A curated selection of aromatic firewoods — apple, cherry and birch logs presented in a gift box. For those who love a beautifully scented fire.',
  'This unique gift box contains a specially selected mix of aromatic firewoods — apple for its sweet, distinctive scent, cherry for its gentle fruity fragrance and birch for its quick-lighting properties and attractive flame.

Presented in a branded Emberwood gift box. Each wood type is labelled. Approximately 8–10 logs per species at 25cm length. An outstanding gift for anyone who values atmosphere and scent as much as heat output.',
  64.99, 'GBP', 'published', TRUE,
  30, 5,
  'Apple, cherry and birch', 'hardwood', 'Seasoned',
  25, 'Box', 9, 'Gift box — approx. 3kg per species, 9kg total',
  'Open fireplace, Chiminea, Fire pit',
  1, NULL
),

-- ─── SPECIALIST & OUTDOOR ──────────────────────────────────────────────────────

-- 34
(
  'Pizza Oven Wood — Kiln Dried Oak (Small Logs)',
  'pizza-oven-wood-kiln-dried-oak-small',
  'PO-OAK-SM-001',
  'Small-format kiln-dried oak logs sized for pizza ovens and kamado grills. Hardwood-fired cooking starts here.',
  'Correctly sized firewood is essential for pizza ovens and kamado grills — logs that are too large will not reach temperature quickly enough. These small oak logs (approximately 15cm) are sized specifically for pizza ovens and outdoor cooking appliances.

Kiln-dried below 20% moisture for fast lighting and high, clean heat. Oak provides a mild, clean smoke that complements food without overpowering it. Each box contains approximately 20–25 small logs.',
  34.99, 'GBP', 'published', TRUE,
  75, 10,
  'Oak', 'hardwood', 'Kiln-dried',
  15, 'Box', 8, 'Box of small pizza oven logs — approx. 8kg',
  'Pizza oven, Outdoor/BBQ',
  1, NULL
),

-- 35
(
  'Pizza Oven Wood — Kiln Dried Ash (Small Logs)',
  'pizza-oven-wood-kiln-dried-ash-small',
  'PO-ASH-SM-001',
  'Small kiln-dried ash logs for pizza ovens. Clean, fast-burning and producing high temperatures with minimal smoke.',
  'Ash is an excellent pizza oven fuel — it burns fast and clean, reaches high temperatures quickly and produces minimal smoke. These small-format logs (approximately 15cm) are sized specifically for pizza ovens and kamado-style outdoor cooking appliances.

Kiln-dried below 20% moisture. Box contains approximately 20–25 small logs.',
  32.99, 'GBP', 'published', TRUE,
  70, 10,
  'Ash', 'hardwood', 'Kiln-dried',
  15, 'Box', 8, 'Box of small pizza oven logs — approx. 8kg',
  'Pizza oven, Outdoor/BBQ',
  1, NULL
),

-- 36
(
  'Fire Pit Wood — Seasoned Mixed Hardwood (Bulk Bag)',
  'fire-pit-wood-seasoned-mixed-hardwood-bulk-bag',
  'FP-MIX-BB-001',
  'A bulk bag of seasoned mixed hardwood specifically selected for outdoor fire pits. Good-sized logs that catch quickly and burn with an attractive flame.',
  'Fire pits call for wood that lights easily, burns with an attractive visible flame and produces good heat for warmth on cool evenings. This bulk bag of seasoned mixed hardwood delivers exactly that.

The mix typically includes birch, ash and beech — all well-seasoned for reliable outdoor burning. Logs are loosely selected for size variation to suit fire pit grates and baskets. Approximately 0.75m³ at 25cm length.',
  169.00, 'GBP', 'published', TRUE,
  25, 4,
  'Mixed hardwood (birch, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 240, 'Approx. 0.75m³ loose fill',
  'Fire pit, Outdoor use, Chiminea',
  1, NULL
),

-- 37
(
  'Chiminea Wood — Kiln Dried Birch & Ash Mix (Small Crate)',
  'chiminea-wood-kiln-dried-birch-ash-small-crate',
  'CHI-BASH-SC-001',
  'Small crate of kiln-dried birch and ash sized for chimineas. Shorter logs, dry wood, reliable performance.',
  'Chimineas have smaller fireboxes than most stoves and require shorter, thinner logs. This small crate contains a mix of kiln-dried birch and ash at approximately 20cm length — perfect for chimineas of all sizes.

Birch lights fast and produces a bright, attractive flame; ash provides steadier longer-burning heat. Together they make a versatile chiminea fuel. Kiln-dried below 20% moisture. Approx. 0.3m³ stacked.',
  95.00, 'GBP', 'published', TRUE,
  40, 6,
  'Birch and ash', 'hardwood', 'Kiln-dried',
  20, 'Crate', 90, 'Small crate — approx. 0.3m³ stacked',
  'Chiminea, Fire pit, Outdoor use',
  1, NULL
),

-- ─── ACCESSORY / SMALLER FORMATS ──────────────────────────────────────────────

-- 38
(
  'Kiln Dried Hardwood Logs — Carry Sack (5kg)',
  'kiln-dried-hardwood-logs-carry-sack-5kg',
  'KD-MIX-CS5-001',
  'A compact 5kg carry sack of kiln-dried mixed hardwood. Ideal for a weekend away, a holiday cottage or occasional evening fires.',
  'The 5kg carry sack is our most compact format — designed for occasional use, holiday cottages, weekend trips and situations where you only need a small quantity of wood. Kiln-dried mixed hardwood, ready to burn immediately.

Each sack contains enough wood for approximately 3–4 fires depending on size. The carry handle makes it easy to bring indoors.',
  12.99, 'GBP', 'published', TRUE,
  200, 30,
  'Mixed hardwood', 'hardwood', 'Kiln-dried',
  25, 'Sack', 5, 'Carry sack — approx. 5kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 39
(
  'Kiln Dried Oak Logs — Carry Sack (8kg)',
  'kiln-dried-oak-logs-carry-sack-8kg',
  'KD-OAK-CS8-001',
  'An 8kg carry sack of kiln-dried oak. Ready to burn, easy to carry, and a perfect top-up between larger deliveries.',
  'An 8kg carry sack of premium kiln-dried oak — ready to burn immediately. The sack format is convenient for carrying to the fire, storing next to the hearth or bringing to a holiday cottage.

Approximately 8–10 logs per sack at 25cm length. Moisture content below 20%. Oak provides a long, steady burn with high heat output.',
  18.99, 'GBP', 'published', TRUE,
  180, 25,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Sack', 8, 'Carry sack — approx. 8kg',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 40
(
  'Kiln Dried Mixed Hardwood — Loose Load (1.5m³)',
  'kiln-dried-mixed-hardwood-loose-load-1-5m3',
  'KD-MIX-LL-001',
  'A large loose load of kiln-dried mixed hardwood delivered directly into your log store or storage area. Maximum volume at the best price.',
  'Our loose load delivery is for customers with an accessible log store, woodshed or dry outdoor storage area. We deliver approximately 1.5m³ of kiln-dried mixed hardwood directly into your storage — no bulk bag to handle.

Mixed hardwood — typically oak, ash and beech — kiln-dried below 20% moisture. Approximately 25cm log length. This is our most cost-effective format per cubic metre.',
  299.00, 'GBP', 'published', TRUE,
  10, 2,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Kiln-dried',
  25, 'Loose load', 540, 'Approx. 1.5m³ loose delivered',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
),

-- ─── SUBSCRIPTION / SEASON PACKS ──────────────────────────────────────────────

-- 41
(
  'Winter Season Pack — Kiln Dried Oak (3 Bulk Bags)',
  'winter-season-pack-kiln-dried-oak-3-bulk-bags',
  'PKG-OAK-3BB-001',
  'Three bulk bags of kiln-dried oak — a full winter supply delivered in one order. Best price-per-bag on kiln-dried oak.',
  'Our winter season pack of three bulk bags of kiln-dried oak is designed for households that heat primarily with wood and want to stock up once and not worry about reordering.

Three standard bulk bags, each approximately 0.75m³ — total approximately 2.25m³ of kiln-dried oak. All bags delivered together. Each bag is individually tied for separate opening as needed.',
  549.00, 'GBP', 'published', TRUE,
  7, 1,
  'Oak', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 840, '3 × bulk bags — approx. 0.75m³ each, 2.25m³ total',
  'Wood-burning stove, Open fireplace',
  3, NULL
),

-- 42
(
  'Winter Season Pack — Mixed Hardwood (3 Bulk Bags)',
  'winter-season-pack-mixed-hardwood-3-bulk-bags',
  'PKG-MIX-3BB-001',
  'Three bulk bags of seasoned mixed hardwood — the most popular seasonal bundle for regular wood burners.',
  'Three standard bulk bags of seasoned mixed hardwood — typically oak, ash and beech — representing a full winter supply for most households that use wood as a secondary or supplementary heat source.

Total approximately 2.25m³ loose fill. Each bag approximately 0.75m³ at 25cm log length. Seasoned 12+ months.',
  489.00, 'GBP', 'published', TRUE,
  9, 2,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 810, '3 × bulk bags — approx. 2.25m³ loose fill total',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  3, NULL
),

-- ─── MORE NET BAGS / SMALLER ──────────────────────────────────────────────────

-- 43
(
  'Seasoned Birch Logs — Net Bag',
  'seasoned-birch-logs-net-bag',
  'SEA-BIRCH-NB-001',
  'Seasoned birch logs in a net bag. Quick-lighting, bright flame and pleasant natural aroma — a lovely everyday firewood.',
  'Silver birch is a favourite for its attractive white bark, quick-lighting nature and pleasant aroma when burning. These seasoned birch logs are ready to use and perform well in open fireplaces, stoves and fire pits.

Net bag approximately 10kg at 25cm log length. Approximately 10–12 logs per net.',
  21.99, 'GBP', 'published', TRUE,
  95, 15,
  'Silver birch', 'hardwood', 'Seasoned',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, 18.99
),

-- 44
(
  'Seasoned Oak Logs — Net Bag',
  'seasoned-oak-logs-net-bag',
  'SEA-OAK-NB-001',
  'Seasoned oak logs in a convenient net bag — classic, long-burning hardwood at an accessible price point.',
  'Seasoned oak in a net bag — perfect for occasional use or for supplementing a bulk delivery. Oak provides one of the longest, most satisfying burns of any firewood and this is a great way to try it before committing to a larger order.

Approximately 10kg per net at 25cm log length.',
  22.99, 'GBP', 'published', TRUE,
  85, 12,
  'Oak', 'hardwood', 'Seasoned',
  25, 'Net bag', 10, 'Net bag — approx. 10kg',
  'Open fireplace, Wood-burning stove',
  1, NULL
),

-- 45
(
  'Kiln Dried Mixed Hardwood — Small Bulk Bag',
  'kiln-dried-mixed-hardwood-small-bulk-bag',
  'KD-MIX-SBB-001',
  'A smaller bulk bag of kiln-dried mixed hardwood — ideal for occasional use or limited storage space.',
  'Not everyone has the space for a full 0.75m³ bulk bag. This smaller bulk bag contains approximately 0.5m³ of kiln-dried mixed hardwood — typically oak, ash and beech — at 25cm log length.

Ready to burn immediately, moisture below 20%. A good choice for occasional burners, small log stores or those trying bulk delivery for the first time.',
  139.00, 'GBP', 'published', TRUE,
  28, 5,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 185, 'Approx. 0.5m³ loose fill — smaller bulk bag',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 46
(
  'Seasoned Mixed Hardwood — Small Bulk Bag',
  'seasoned-mixed-hardwood-small-bulk-bag',
  'SEA-MIX-SBB-001',
  'Seasoned mixed hardwood in a compact bulk bag. Great value for occasional burners or those with limited storage.',
  'A compact bulk bag of seasoned mixed hardwood at approximately 0.5m³. Contains a mix of oak, ash and beech seasoned for 12+ months — reliable, good-value firewood for open fireplaces and stoves.

Suitable for wood-burning stoves, multi-fuel stoves and open fireplaces.',
  115.00, 'GBP', 'published', TRUE,
  32, 5,
  'Mixed hardwood (oak, ash, beech)', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 175, 'Approx. 0.5m³ loose fill — smaller bulk bag',
  'Wood-burning stove, Open fireplace',
  1, NULL
),

-- 47
(
  'Hardwood Log Bundle — Hessian Sack',
  'hardwood-log-bundle-hessian-sack',
  'GIFT-HSN-001',
  'A beautifully presented hessian sack of mixed kiln-dried hardwood logs. A thoughtful, rustic gift or a stylish addition beside your hearth.',
  'A generous hessian sack filled with kiln-dried hardwood logs — presented with a natural rope tie. Practical enough to use, attractive enough to give as a gift or display next to your fireplace.

Contains approximately 10–12 logs at 25cm length in a mix of oak and ash. Total approximately 7–8kg. The hessian sack is reusable as a log carrier.',
  34.99, 'GBP', 'published', TRUE,
  55, 8,
  'Oak and ash', 'hardwood', 'Kiln-dried',
  25, 'Sack', 8, 'Hessian sack — approx. 7–8kg',
  'Open fireplace, Wood-burning stove',
  1, NULL
),

-- 48
(
  'Firewood Accessory Bundle — Log Carrier + Kindling + Starters',
  'firewood-accessory-bundle-carrier-kindling-starters',
  'ACC-BDL-001',
  'Everything for the fireside — a canvas log carrier, a net of hardwood kindling and a pack of natural fire starters.',
  'A practical fireside accessory bundle containing everything you need to light and carry your fire:

- Heavy-duty canvas log carrier (holds 10–12 logs)
- 1 large net of hardwood kindling (approx. 3.5kg)
- 12 natural wood wool fire lighters

An ideal gift for new homeowners, new stove installers or anyone setting up their fireside for the first time. The canvas carrier is durable, washable and designed for daily use.',
  39.99, 'GBP', 'published', TRUE,
  40, 6,
  'Mixed hardwood', 'hardwood', 'Air-dried',
  NULL, 'Bundle', 4.5, 'Canvas carrier + kindling net + fire starters',
  'Open fireplace, Wood-burning stove, Fire pit',
  1, NULL
),

-- 49
(
  'Seasoned Hazel Logs — Bulk Bag',
  'seasoned-hazel-logs-bulk-bag',
  'SEA-HAZEL-BB-001',
  'Seasoned hazel logs burn cleanly with a pleasant mild scent and are surprisingly good for heat output given their lighter weight.',
  'Hazel is an underrated firewood species. It is lighter than oak or beech but burns cleanly with a pleasant, subtle aroma and makes an excellent fire that lights easily and builds quickly. It is particularly popular for open fireplaces where visual appeal matters.

Seasoned 12+ months. Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  169.00, 'GBP', 'published', TRUE,
  18, 3,
  'Hazel', 'hardwood', 'Seasoned',
  25, 'Bulk bag', 220, 'Approx. 0.75m³ loose fill',
  'Open fireplace, Fire pit, Chiminea',
  1, NULL
),

-- 50
(
  'Kiln Dried Sycamore Logs — Bulk Bag',
  'kiln-dried-sycamore-logs-bulk-bag',
  'KD-SYC-BB-001',
  'Kiln-dried sycamore logs — a good mid-range hardwood with clean burning properties and decent heat output for a reasonable price.',
  'Sycamore is a consistent, reliable hardwood firewood. It is not as dense as oak or hornbeam but burns cleanly, produces a good steady heat and makes an excellent everyday firewood at a reasonable price point.

Kiln-dried below 20% moisture and ready to burn immediately. Approximately 25cm log length. Bulk bag approximately 0.75m³.',
  179.00, 'GBP', 'published', TRUE,
  22, 4,
  'Sycamore', 'hardwood', 'Kiln-dried',
  25, 'Bulk bag', 250, 'Approx. 0.75m³ loose fill',
  'Wood-burning stove, Open fireplace, Multi-fuel stove',
  1, NULL
)
ON CONFLICT (slug) DO NOTHING;

-- ─── Category links ───────────────────────────────────────────────────────────

DO $$
DECLARE
  c_kiln       UUID; c_seasoned  UUID; c_hardwood  UUID; c_softwood  UUID;
  c_kindling   UUID; c_bulk      UUID; c_stoves    UUID; c_firepits  UUID;
  c_premium    UUID; c_briquette UUID; c_firewood  UUID;
BEGIN
  SELECT id INTO c_kiln       FROM categories WHERE slug = 'kiln-dried-logs';
  SELECT id INTO c_seasoned   FROM categories WHERE slug = 'seasoned-hardwood-logs';
  SELECT id INTO c_hardwood   FROM categories WHERE slug = 'hardwood-logs';
  SELECT id INTO c_softwood   FROM categories WHERE slug = 'softwood-logs';
  SELECT id INTO c_kindling   FROM categories WHERE slug = 'kindling-fire-starters';
  SELECT id INTO c_bulk       FROM categories WHERE slug = 'bulk-firewood-deals';
  SELECT id INTO c_stoves     FROM categories WHERE slug = 'firewood-for-stoves';
  SELECT id INTO c_firepits   FROM categories WHERE slug = 'firewood-fire-pits';
  SELECT id INTO c_premium    FROM categories WHERE slug = 'premium-hardwood';
  SELECT id INTO c_briquette  FROM categories WHERE slug = 'logs-briquettes';
  SELECT id INTO c_firewood   FROM categories WHERE slug = 'firewood-logs';

  -- Product 1: Kiln Dried Oak Large Bulk Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 2: Kiln Dried Ash Bulk Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-ash-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-ash-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-ash-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 3: Kiln Dried Birch Bulk Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-birch-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'kiln-dried-birch-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 4: Kiln Dried Beech Bulk Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-beech-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-beech-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'kiln-dried-beech-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 5: Kiln Dried Hornbeam
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-hornbeam-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'kiln-dried-hornbeam-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-hornbeam-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 6: Seasoned Oak Bulk Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-oak-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_hardwood FROM products p WHERE p.slug = 'seasoned-oak-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'seasoned-oak-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 7: Seasoned Elm
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-elm-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_hardwood FROM products p WHERE p.slug = 'seasoned-elm-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 8: Seasoned Cherry
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-cherry-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'seasoned-cherry-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'seasoned-cherry-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 9: Seasoned Apple
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-apple-wood-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'seasoned-apple-wood-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'seasoned-apple-wood-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 10: Seasoned Walnut
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-walnut-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'seasoned-walnut-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Product 11: Oak Large Crate
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-crate' ON CONFLICT DO NOTHING;

  -- Product 12: Ash Large Crate
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-ash-logs-large-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-ash-logs-large-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-ash-logs-large-crate' ON CONFLICT DO NOTHING;

  -- Product 13: Mixed Hardwood Large Crate
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-large-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-large-crate' ON CONFLICT DO NOTHING;

  -- Product 14: Oak Full Season Pallet
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-oak-full-season-pallet' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'kiln-dried-oak-full-season-pallet' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-oak-full-season-pallet' ON CONFLICT DO NOTHING;

  -- Product 15: Ash Full Season Pallet
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-ash-full-season-pallet' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-ash-full-season-pallet' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-ash-full-season-pallet' ON CONFLICT DO NOTHING;

  -- Product 16: Seasoned Mixed XL Builders Bag
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-builders-bag-xl' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-builders-bag-xl' ON CONFLICT DO NOTHING;

  -- Products 17–20: net bags / multipacks
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-ash-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-beech-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'mixed-hardwood-logs-net-bag-3pack' ON CONFLICT DO NOTHING;

  -- Products 21–25: kindling & starters
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'premium-hardwood-kindling-large-box' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'softwood-kindling-large-net' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'hardwood-kindling-5pack-nets' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'natural-wood-wool-fire-lighters-100' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'eco-fire-starter-blocks-48' ON CONFLICT DO NOTHING;

  -- Products 26–28: briquettes
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_briquette FROM products p WHERE p.slug = 'premium-hardwood-briquettes-box-24' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_briquette FROM products p WHERE p.slug = 'peat-free-heat-logs-box-12' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_briquette FROM products p WHERE p.slug = 'hardwood-briquettes-pallet-20-boxes' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk      FROM products p WHERE p.slug = 'hardwood-briquettes-pallet-20-boxes' ON CONFLICT DO NOTHING;

  -- Products 29–30: softwood
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_softwood FROM products p WHERE p.slug = 'kiln-dried-scots-pine-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'kiln-dried-scots-pine-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_softwood FROM products p WHERE p.slug = 'seasoned-larch-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'seasoned-larch-logs-bulk-bag' ON CONFLICT DO NOTHING;

  -- Products 31–33: gift sets
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firewood FROM products p WHERE p.slug = 'premium-firewood-gift-set-deluxe' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firewood FROM products p WHERE p.slug = 'firewood-starter-bundle-stove-pack' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'firewood-starter-bundle-stove-pack' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_premium  FROM products p WHERE p.slug = 'aromatic-wood-selection-gift-box' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'aromatic-wood-selection-gift-box' ON CONFLICT DO NOTHING;

  -- Products 34–37: specialist
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'pizza-oven-wood-kiln-dried-oak-small' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'pizza-oven-wood-kiln-dried-ash-small' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'fire-pit-wood-seasoned-mixed-hardwood-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'fire-pit-wood-seasoned-mixed-hardwood-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'chiminea-wood-kiln-dried-birch-ash-small-crate' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'chiminea-wood-kiln-dried-birch-ash-small-crate' ON CONFLICT DO NOTHING;

  -- Products 38–40: small formats
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-hardwood-logs-carry-sack-5kg' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-oak-logs-carry-sack-8kg' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-loose-load-1-5m3' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-loose-load-1-5m3' ON CONFLICT DO NOTHING;

  -- Products 41–42: season packs
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'winter-season-pack-kiln-dried-oak-3-bulk-bags' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'winter-season-pack-kiln-dried-oak-3-bulk-bags' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_bulk     FROM products p WHERE p.slug = 'winter-season-pack-mixed-hardwood-3-bulk-bags' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'winter-season-pack-mixed-hardwood-3-bulk-bags' ON CONFLICT DO NOTHING;

  -- Products 43–50: remaining nets/misc
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-birch-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'seasoned-birch-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-oak-logs-net-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-small-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-small-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firewood FROM products p WHERE p.slug = 'hardwood-log-bundle-hessian-sack' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firewood FROM products p WHERE p.slug = 'firewood-accessory-bundle-carrier-kindling-starters' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kindling FROM products p WHERE p.slug = 'firewood-accessory-bundle-carrier-kindling-starters' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_seasoned FROM products p WHERE p.slug = 'seasoned-hazel-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_firepits FROM products p WHERE p.slug = 'seasoned-hazel-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_kiln     FROM products p WHERE p.slug = 'kiln-dried-sycamore-logs-bulk-bag' ON CONFLICT DO NOTHING;
  INSERT INTO product_categories (product_id, category_id) SELECT p.id, c_stoves   FROM products p WHERE p.slug = 'kiln-dried-sycamore-logs-bulk-bag' ON CONFLICT DO NOTHING;
END $$;

-- ─── SEO records for all 50 products ─────────────────────────────────────────

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Logs Large Bulk Bag | Emberwood', 'Premium kiln-dried oak logs in a large bulk bag. Ready to burn, below 20% moisture. Approx 1.0m³ — outstanding heat and long slow burns.'
FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Ash Logs Bulk Bag | Emberwood', 'Kiln-dried ash logs in a standard bulk bag. Below 20% moisture, clean burning, steady heat. Approx 0.75m³ — ready to burn on delivery.'
FROM products p WHERE p.slug = 'kiln-dried-ash-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Birch Logs Bulk Bag | Emberwood', 'Kiln-dried silver birch logs — fast-lighting with a bright flame and pleasant aroma. Bulk bag approx 0.75m³, ready to burn immediately.'
FROM products p WHERE p.slug = 'kiln-dried-birch-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Beech Logs Bulk Bag | Emberwood', 'Premium kiln-dried beech logs — steady even heat with minimal ash. Approx 0.75m³ bulk bag, below 20% moisture, ready to burn.'
FROM products p WHERE p.slug = 'kiln-dried-beech-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Hornbeam Logs | Emberwood', 'Hornbeam — the densest British hardwood firewood. Kiln dried, exceptional heat output, burns longer than oak. Bulk bag approx 0.75m³.'
FROM products p WHERE p.slug = 'kiln-dried-hornbeam-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Oak Logs Bulk Bag | Emberwood', 'Air-seasoned oak logs in a bulk bag. Seasoned 18+ months for reliable steady burning. Approx 0.75m³ — excellent value firewood.'
FROM products p WHERE p.slug = 'seasoned-oak-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Elm Logs Bulk Bag | Emberwood', 'Dense, slow-burning seasoned elm logs with a subtle sweet aroma. Seasoned 24+ months. Bulk bag approx 0.75m³.'
FROM products p WHERE p.slug = 'seasoned-elm-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Cherry Wood Logs Bulk Bag | Emberwood', 'Seasoned cherry logs — a beautiful aroma and warm flame. Perfect for open fireplaces. Approx 0.75m³ bulk bag.'
FROM products p WHERE p.slug = 'seasoned-cherry-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Apple Wood Logs | Emberwood', 'Premium apple wood firewood — slow-burning with a distinctive sweet scent. Orchard sourced, 18+ months seasoned. Bulk bag approx 0.75m³.'
FROM products p WHERE p.slug = 'seasoned-apple-wood-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Walnut Logs Bulk Bag | Emberwood', 'Rare and luxurious walnut firewood — rich earthy aroma, high heat, minimal ash. Limited availability. Approx 0.75m³ bulk bag.'
FROM products p WHERE p.slug = 'seasoned-walnut-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Logs Large Crate | Emberwood', 'Premium kiln-dried oak in a large sturdy crate. Approx 1.0m³ stacked, ready to burn. Ideal for log stores and garages.'
FROM products p WHERE p.slug = 'kiln-dried-oak-logs-large-crate' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Ash Logs Large Crate | Emberwood', 'Kiln-dried ash logs in a large crate. Clean, efficient burning, approx 1.0m³ stacked. Ready to use, easy to store.'
FROM products p WHERE p.slug = 'kiln-dried-ash-logs-large-crate' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Mixed Hardwood Large Crate | Emberwood', 'Kiln-dried mixed hardwood crate — oak, ash and beech. Approx 1.0m³ stacked. Ready to burn, great all-round firewood.'
FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-large-crate' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Full Season Pallet | Emberwood', 'Full pallet of kiln-dried oak — 2.0m³, enough for a full season. Best price on premium oak firewood for heavy burners.'
FROM products p WHERE p.slug = 'kiln-dried-oak-full-season-pallet' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Ash Full Season Pallet | Emberwood', 'Full season pallet of kiln-dried ash logs — approx 2.0m³. Most cost-effective way to buy quality ready-to-burn firewood.'
FROM products p WHERE p.slug = 'kiln-dried-ash-full-season-pallet' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Mixed Hardwood Builders Bag XL | Emberwood', 'Extra-large builders bag of seasoned mixed hardwood — approx 1.5m³. Maximum quantity, best value for high-use homes.'
FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-builders-bag-xl' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Logs Net Bag | Emberwood', 'Kiln-dried oak logs in a convenient net bag. Ready to burn, approx 10kg. Perfect top-up between larger deliveries.'
FROM products p WHERE p.slug = 'kiln-dried-oak-logs-net-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Ash Logs Net Bag | Emberwood', 'Kiln-dried ash logs in a net bag. Approx 10kg, ready to burn. Clean, steady heat for stoves and fireplaces.'
FROM products p WHERE p.slug = 'kiln-dried-ash-logs-net-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Beech Logs Net Bag | Emberwood', 'Kiln-dried beech logs — approx 10kg net bag. Steady even heat, minimal ash, ready to burn straight from delivery.'
FROM products p WHERE p.slug = 'kiln-dried-beech-logs-net-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Mixed Hardwood Logs Net Bag 3-Pack | Emberwood', 'Three nets of kiln-dried mixed hardwood — oak, ash and beech. Best value net bag multipack, approx 30kg total.'
FROM products p WHERE p.slug = 'mixed-hardwood-logs-net-bag-3pack' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Premium Hardwood Kindling Large Box | Emberwood', 'Premium kiln-dried hardwood kindling in a large box. Perfect splits for reliable fire starting — approx 5kg, 25–35 sessions.'
FROM products p WHERE p.slug = 'premium-hardwood-kindling-large-box' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Softwood Kindling Large Net | Emberwood', 'Dry softwood kindling in a large net — lights instantly, burns hot. Approx 4kg, ideal for fast fire starting.'
FROM products p WHERE p.slug = 'softwood-kindling-large-net' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Kindling 5-Pack Nets | Emberwood', 'Five nets of hardwood kindling — best value kindling multipack. Never run out during burning season. Approx 17.5kg.'
FROM products p WHERE p.slug = 'hardwood-kindling-5pack-nets' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Natural Wood Wool Fire Lighters Box 100 | Emberwood', 'Natural odourless wood wool fire lighters. No kerosene, no chemicals. Box of 100, burns 8–10 mins each.'
FROM products p WHERE p.slug = 'natural-wood-wool-fire-lighters-100' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Eco Fire Starter Blocks Pack of 48 | Emberwood', 'Eco fire starter blocks — natural, peat-free, no petroleum. Pack of 48. Light under kindling for a reliable fire every time.'
FROM products p WHERE p.slug = 'eco-fire-starter-blocks-48' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Premium Hardwood Briquettes Box of 24 | Emberwood', 'Compressed hardwood briquettes — box of 24, approx 24kg. Burns longer than logs, consistent heat, very low ash.'
FROM products p WHERE p.slug = 'premium-hardwood-briquettes-box-24' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Peat-Free Heat Logs Box of 12 | Emberwood', '100% recycled compressed wood heat logs — peat-free, chemical-free. Box of 12, approx 14.4kg. Low smoke, clean burning.'
FROM products p WHERE p.slug = 'peat-free-heat-logs-box-12' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Briquettes Full Pallet 20 Boxes | Emberwood', 'Full pallet of hardwood briquettes — 20 boxes, 240 briquettes total. Best price per briquette for primary stove users.'
FROM products p WHERE p.slug = 'hardwood-briquettes-pallet-20-boxes' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Scots Pine Logs Bulk Bag | Emberwood', 'Kiln-dried Scots pine — fast-lighting, fragrant, ideal for fire pits and chimineas. Approx 0.75m³ bulk bag.'
FROM products p WHERE p.slug = 'kiln-dried-scots-pine-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Larch Logs Bulk Bag | Emberwood', 'Seasoned larch logs — denser than most softwoods, burns hotter and longer. Great for outdoor fires. Approx 0.75m³.'
FROM products p WHERE p.slug = 'seasoned-larch-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Premium Firewood Gift Set Deluxe | Emberwood', 'Deluxe firewood gift set — kiln-dried oak logs, hardwood kindling and fire starters in a jute sack. Perfect gift for fire owners.'
FROM products p WHERE p.slug = 'premium-firewood-gift-set-deluxe' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Firewood Stove Starter Bundle | Emberwood', 'Everything for a new wood-burning stove owner — kiln-dried ash logs, kindling and fire starters. A thoughtful practical gift.'
FROM products p WHERE p.slug = 'firewood-starter-bundle-stove-pack' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Aromatic Firewood Selection Gift Box | Emberwood', 'Gift box of aromatic firewoods — apple, cherry and birch. For those who love a beautifully scented fire. Each species labelled.'
FROM products p WHERE p.slug = 'aromatic-wood-selection-gift-box' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Pizza Oven Wood Kiln Dried Oak | Emberwood', 'Small-format kiln-dried oak logs for pizza ovens and kamado grills. Correctly sized, below 20% moisture, clean burning.'
FROM products p WHERE p.slug = 'pizza-oven-wood-kiln-dried-oak-small' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Pizza Oven Wood Kiln Dried Ash | Emberwood', 'Small kiln-dried ash logs for pizza ovens — fast-burning, high temperature, minimal smoke. Perfectly sized for outdoor cooking.'
FROM products p WHERE p.slug = 'pizza-oven-wood-kiln-dried-ash-small' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Fire Pit Wood Seasoned Hardwood Bulk Bag | Emberwood', 'Seasoned mixed hardwood bulk bag for outdoor fire pits. Birch, ash and beech — fast-lighting, good flame, 0.75m³.'
FROM products p WHERE p.slug = 'fire-pit-wood-seasoned-mixed-hardwood-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Chiminea Wood Kiln Dried Birch Ash Crate | Emberwood', 'Short-format kiln-dried birch and ash logs for chimineas — 20cm length, 0.3m³ crate. Ready to burn.'
FROM products p WHERE p.slug = 'chiminea-wood-kiln-dried-birch-ash-small-crate' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Hardwood Carry Sack 5kg | Emberwood', 'Compact 5kg carry sack of kiln-dried mixed hardwood. Perfect for holiday cottages, weekends away, or occasional fires.'
FROM products p WHERE p.slug = 'kiln-dried-hardwood-logs-carry-sack-5kg' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Oak Carry Sack 8kg | Emberwood', 'Kiln-dried oak logs in an 8kg carry sack. Ready to burn, easy to carry, great for top-ups between larger deliveries.'
FROM products p WHERE p.slug = 'kiln-dried-oak-logs-carry-sack-8kg' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Hardwood Loose Load 1.5m³ | Emberwood', 'Kiln-dried mixed hardwood loose load — 1.5m³ delivered directly into your log store. Best value per cubic metre we offer.'
FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-loose-load-1-5m3' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Winter Season Pack Kiln Dried Oak 3 Bags | Emberwood', 'Three bulk bags of kiln-dried oak — a full winter supply in one order. 2.25m³ total. Best price-per-bag on kiln-dried oak.'
FROM products p WHERE p.slug = 'winter-season-pack-kiln-dried-oak-3-bulk-bags' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Winter Season Pack Mixed Hardwood 3 Bags | Emberwood', 'Three bulk bags of seasoned mixed hardwood — 2.25m³ total. Perfect seasonal supply for regular wood burners.'
FROM products p WHERE p.slug = 'winter-season-pack-mixed-hardwood-3-bulk-bags' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Birch Logs Net Bag | Emberwood', 'Seasoned silver birch logs in a net bag — quick-lighting with a bright flame and pleasant aroma. Approx 10kg.'
FROM products p WHERE p.slug = 'seasoned-birch-logs-net-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Oak Logs Net Bag | Emberwood', 'Seasoned oak logs in a convenient net bag — classic long-burning hardwood. Approx 10kg, great for occasional use.'
FROM products p WHERE p.slug = 'seasoned-oak-logs-net-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Mixed Hardwood Small Bulk Bag | Emberwood', 'Smaller bulk bag of kiln-dried hardwood — approx 0.5m³. For occasional burners or limited storage. Ready to burn.'
FROM products p WHERE p.slug = 'kiln-dried-mixed-hardwood-small-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Mixed Hardwood Small Bulk Bag | Emberwood', 'Compact bulk bag of seasoned mixed hardwood — approx 0.5m³. Good value for occasional use or small log stores.'
FROM products p WHERE p.slug = 'seasoned-mixed-hardwood-small-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Hardwood Log Bundle Hessian Sack | Emberwood', 'Kiln-dried oak and ash logs in a natural hessian sack with rope tie. A practical and stylish gift or hearth display.'
FROM products p WHERE p.slug = 'hardwood-log-bundle-hessian-sack' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Firewood Accessory Bundle Log Carrier | Emberwood', 'Canvas log carrier, hardwood kindling and natural fire starters in one bundle. Everything for the fireside.'
FROM products p WHERE p.slug = 'firewood-accessory-bundle-carrier-kindling-starters' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Seasoned Hazel Logs Bulk Bag | Emberwood', 'Seasoned hazel firewood — clean burning with a mild pleasant scent. Quick to light, good for open fireplaces. Approx 0.75m³.'
FROM products p WHERE p.slug = 'seasoned-hazel-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;

INSERT INTO seo_records (entity_type, entity_id, seo_title, meta_description)
SELECT 'product', p.id, 'Kiln Dried Sycamore Logs Bulk Bag | Emberwood', 'Kiln-dried sycamore — a reliable, clean-burning hardwood at a reasonable price. Approx 0.75m³, ready to burn.'
FROM products p WHERE p.slug = 'kiln-dried-sycamore-logs-bulk-bag' ON CONFLICT (entity_type, entity_id) DO NOTHING;
