-- ──────────────────────────────────────────────────────────────────
-- Livion Interiors — Database Schema
-- Run this once on your PostgreSQL instance to initialise tables
-- ──────────────────────────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Lead Status Enum ─────────────────────────────────────────────
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'site_visit',
  'quotation',
  'confirmed',
  'lost'
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

-- ─── Auto-update updated_at ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Indexes ──────────────────────────────────────────────────────
CREATE INDEX idx_leads_status     ON leads (status);
CREATE INDEX idx_leads_phone      ON leads (phone);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);

-- ─── Cost Estimator Config (for Phase 2 integration) ──────────────
CREATE TABLE IF NOT EXISTS estimator_config (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flat_type      VARCHAR(20) NOT NULL,  -- 2BHK, 3BHK, Villa, etc.
  interior_level VARCHAR(20) NOT NULL,  -- Basic, Premium, Luxury
  min_cost       INTEGER     NOT NULL,  -- in INR
  max_cost       INTEGER     NOT NULL,  -- in INR
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default pricing (update as needed)
INSERT INTO estimator_config (flat_type, interior_level, min_cost, max_cost) VALUES
  ('2BHK', 'Basic',   400000,  600000),
  ('2BHK', 'Premium', 700000, 1000000),
  ('2BHK', 'Luxury', 1100000, 1600000),
  ('3BHK', 'Basic',   600000,  900000),
  ('3BHK', 'Premium',1000000, 1500000),
  ('3BHK', 'Luxury', 1600000, 2500000),
  ('4BHK', 'Basic',   900000, 1300000),
  ('4BHK', 'Premium',1400000, 2000000),
  ('4BHK', 'Luxury', 2100000, 3500000),
  ('Villa','Basic',  1500000, 2500000),
  ('Villa','Premium',2600000, 4000000),
  ('Villa','Luxury', 4100000, 8000000);
