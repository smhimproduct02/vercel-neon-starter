-- Segment: Device Management Schema
-- Adds device tracking table to existing database

CREATE TABLE IF NOT EXISTS segment_devices (
  id TEXT PRIMARY KEY DEFAULT ('dev_' || substr(md5(random()::text), 1, 16)),
  device_name TEXT NOT NULL,
  product TEXT NOT NULL,
  role TEXT CHECK (role IN ('main','backup')) DEFAULT 'main',
  status TEXT CHECK (status IN ('online','offline','unknown')) DEFAULT 'unknown',
  assigned_count INTEGER DEFAULT 0,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_segment_devices_product ON segment_devices(product);
CREATE INDEX IF NOT EXISTS idx_segment_devices_status ON segment_devices(status);
