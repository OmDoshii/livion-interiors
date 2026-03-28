-- ──────────────────────────────────────────────────────────────────
-- Livion Interiors — Full Database Schema (Updated)
-- Run this once on your PostgreSQL instance
-- ──────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Lead Status Enum ─────────────────────────────────────────────
CREATE TYPE lead_status AS ENUM (
  'new', 'contacted', 'site_visit', 'quotation', 'confirmed', 'lost'
);

-- ─── Leads Table ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(60)  NOT NULL,
  phone            VARCHAR(15)  NOT NULL,
  project_location VARCHAR(100) NOT NULL,
  flat_size        VARCHAR(20)  NOT NULL,
  possession_date  VARCHAR(60)  NOT NULL,
  budget_range     VARCHAR(50)  NOT NULL,
  message          TEXT,
  status           lead_status  NOT NULL DEFAULT 'new',
  source           VARCHAR(50)  NOT NULL DEFAULT 'landing_page',
  notes            TEXT,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ─── Reviews Table ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(100) NOT NULL,
  location   VARCHAR(100) NOT NULL,
  text       TEXT         NOT NULL,
  rating     INTEGER      NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url  TEXT,
  initials   VARCHAR(4)   NOT NULL,
  is_active  BOOLEAN      NOT NULL DEFAULT true,
  sort_order INTEGER      NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed default reviews
INSERT INTO reviews (name, location, text, rating, initials, sort_order) VALUES
  ('Priya & Rahul Sharma', '3BHK · Gachibowli',  'Livion transformed our bare apartment into a home we love. The team was professional, the designs were stunning, and delivery was on time. Best decision we made.', 5, 'PS', 1),
  ('Vikram Reddy',         'Villa · Jubilee Hills','I was impressed by how well they understood our lifestyle and translated it into the design. Every corner of our villa feels intentional and luxurious.',        5, 'VR', 2),
  ('Anita Mehta',          '2BHK · Kondapur',     'The cost estimator tool gave me confidence before committing. The actual execution exceeded the 3D renders. Very happy with the modular kitchen especially!',    5, 'AM', 3);

-- ─── Portfolio Projects Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR(100) NOT NULL,
  location   VARCHAR(100) NOT NULL,
  size       VARCHAR(50)  NOT NULL,
  tag        VARCHAR(20)  NOT NULL,
  image_url  TEXT,
  is_active  BOOLEAN      NOT NULL DEFAULT true,
  is_featured BOOLEAN     NOT NULL DEFAULT false,
  sort_order INTEGER      NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed default portfolio
INSERT INTO portfolio_projects (title, location, size, tag, sort_order) VALUES
  ('Modern 3BHK',   'Gachibowli',   '1,450 sq ft', '3BHK',  1),
  ('Compact 2BHK',  'Kondapur',     '1,050 sq ft', '2BHK',  2),
  ('Premium Villa', 'Jubilee Hills', '3,200 sq ft', 'Villa', 3),
  ('Luxury 3BHK',   'Banjara Hills', '1,800 sq ft', '3BHK',  4);

-- ─── Admin Users Table ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(50)  NOT NULL UNIQUE,
  password_hash TEXT         NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Default admin: username=admin, password=livion@admin123
-- (Change this immediately after first login!)
-- bcrypt hash for "livion@admin123":
INSERT INTO admin_users (username, password_hash) VALUES
  ('admin', '$2b$10$rQZ3rBJJGRCf5bXjZqXnUOv3H5tWMq8kYmLpNxDhR6qKzF4mI8Ose');

-- ─── Estimator Config ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS estimator_config (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flat_type      VARCHAR(20) NOT NULL,
  interior_level VARCHAR(20) NOT NULL,
  min_cost       INTEGER     NOT NULL,
  max_cost       INTEGER     NOT NULL,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO estimator_config (flat_type, interior_level, min_cost, max_cost) VALUES
  ('2BHK', 'Basic',    400000,  600000),
  ('2BHK', 'Premium',  700000, 1000000),
  ('2BHK', 'Luxury',  1100000, 1600000),
  ('3BHK', 'Basic',    600000,  900000),
  ('3BHK', 'Premium', 1000000, 1500000),
  ('3BHK', 'Luxury',  1600000, 2500000),
  ('Villa','Basic',   1500000, 2500000),
  ('Villa','Premium', 2600000, 4000000),
  ('Villa','Luxury',  4100000, 8000000);

-- ─── Auto-update updated_at trigger ───────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at         BEFORE UPDATE ON leads              FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER reviews_updated_at       BEFORE UPDATE ON reviews            FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER portfolio_updated_at     BEFORE UPDATE ON portfolio_projects  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Indexes ──────────────────────────────────────────────────────
CREATE INDEX idx_leads_status       ON leads             (status);
CREATE INDEX idx_leads_created_at   ON leads             (created_at DESC);
CREATE INDEX idx_reviews_active     ON reviews           (is_active, sort_order);
CREATE INDEX idx_portfolio_active   ON portfolio_projects (is_active, sort_order);
