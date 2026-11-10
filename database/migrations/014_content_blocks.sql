-- =============================================================================
-- Migration 014: Content blocks
-- Editable site-wide text blocks managed via the admin Content page.
-- =============================================================================

CREATE TABLE IF NOT EXISTS content_blocks (
  id          UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT         NOT NULL UNIQUE,
  label       TEXT         NOT NULL,
  value       TEXT         NOT NULL DEFAULT '',
  type        TEXT         NOT NULL DEFAULT 'text'
                           CHECK (type IN ('text', 'richtext', 'url')),
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_by  UUID         REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Seed with Emberwood content blocks
INSERT INTO content_blocks (key, label, value, type) VALUES
  ('homepage_announcement',    'Homepage announcement bar',        '',                                                                              'text'),
  ('homepage_hero_eyebrow',    'Hero eyebrow label',               'Premium Firewood & Timber',                                                     'text'),
  ('homepage_hero_heading',    'Hero main heading',                'Natural Warmth. Built to Last.',                                                 'text'),
  ('homepage_hero_subtext',    'Hero subtext paragraph',           'High-quality firewood and timber for your home, garden and projects. Sourced responsibly, expertly prepared, and delivered to your door.', 'richtext'),
  ('homepage_trust_heading',   'Trust section heading',            'Your Trusted Supplier of Firewood and Timber',                                  'text'),
  ('homepage_trust_body',      'Trust section body text',          'We take pride in providing premium quality products, sourced responsibly and delivered with care.',                                         'richtext'),
  ('delivery_notice',          'Delivery availability notice',     'Delivery availability and final charges are confirmed on each order request. Not all areas may be serviceable.',                           'text'),
  ('contact_intro',            'Contact page intro text',          'Have a product question, delivery query, or need help with an order? We are here to help.',                                                'text'),
  ('firewood_guide_intro',     'Firewood guide introduction',      'Choosing the right firewood makes a real difference to your fire. Here is everything you need to know.',                                   'richtext'),
  ('order_request_notice',     'Order request page notice',        'This is an order request. Stock availability and delivery charges will be confirmed before your order is finalised.',                      'text')
ON CONFLICT (key) DO NOTHING;

-- Updated_at trigger
CREATE TRIGGER set_content_blocks_updated_at
  BEFORE UPDATE ON content_blocks
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: service role only (admin API uses service role key)
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON content_blocks
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
