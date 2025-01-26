/*
  # Initial Schema Setup for Transport Management System

  1. Tables
    - users: Stores user information for both clients and partners
    - services: Available service types
    - requests: Customer service requests
    - request_options: Additional options for requests
    - addresses: Addresses for pickup and delivery

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('client', 'partner');

-- Create enum for request status
CREATE TYPE request_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create enum for service types
CREATE TYPE service_type AS ENUM ('transport', 'moving', 'delivery');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  encrypted_password TEXT NOT NULL,
  role user_role NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type service_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  price_per_km DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Service requests table
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id),
  service_id UUID NOT NULL REFERENCES services(id),
  pickup_address_id UUID NOT NULL REFERENCES addresses(id),
  delivery_address_id UUID NOT NULL REFERENCES addresses(id),
  status request_status NOT NULL DEFAULT 'pending',
  scheduled_date TIMESTAMPTZ NOT NULL,
  distance_km DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Request options table
CREATE TABLE request_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES requests(id),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_options ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Public can view services"
  ON services
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Users can view their own addresses"
  ON addresses
  FOR SELECT
  USING (
    id IN (
      SELECT pickup_address_id FROM requests WHERE client_id = auth.uid()
      UNION
      SELECT delivery_address_id FROM requests WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own requests"
  ON requests
  FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Users can view their own request options"
  ON request_options
  FOR SELECT
  USING (
    request_id IN (
      SELECT id FROM requests WHERE client_id = auth.uid()
    )
  );

-- Insert initial services
INSERT INTO services (type, name, description, base_price, price_per_km) VALUES
  ('transport', 'Transport Standard', 'Transport standard pour objets de taille moyenne', 50.00, 1.50),
  ('moving', 'Déménagement Complet', 'Service complet de déménagement avec personnel', 200.00, 2.50),
  ('delivery', 'Livraison Express', 'Livraison rapide de colis', 30.00, 1.00);