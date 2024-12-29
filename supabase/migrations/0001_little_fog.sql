/*
  # Initial Database Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - created_at (timestamp)
      - preferences (jsonb)
      
    - emissions_data
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - type (text) - transport, energy, shopping, etc.
      - emissions (numeric)
      - metadata (jsonb)
      - created_at (timestamp)
      
    - recommendations
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - description (text)
      - impact (numeric)
      - type (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Emissions data table
CREATE TABLE IF NOT EXISTS emissions_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  emissions numeric NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emissions_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own emissions data"
  ON emissions_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own emissions data"
  ON emissions_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  impact numeric,
  type text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own recommendations"
  ON recommendations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_emissions_user_type 
  ON emissions_data(user_id, type);

CREATE INDEX IF NOT EXISTS idx_emissions_created_at 
  ON emissions_data(created_at);

CREATE INDEX IF NOT EXISTS idx_recommendations_user_status 
  ON recommendations(user_id, status);