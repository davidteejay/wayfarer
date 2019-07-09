CREATE DATABASE wayfarer;
USE wayfarer;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL, 
  password VARCHAR NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS buses (
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR NOT NULL UNIQUE,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR NOT NULL, 
  year VARCHAR NOT NULL,
  capacity INTEGER NOT NULL,
  created_by SERIAL NOT NULL
);

CREATE TYPE status AS ENUM ('active', 'cancelled');
CREATE TABLE IF NOT EXISTS trips (
  id SERIAL PRIMARY KEY,
  bus_id SERIAL NOT NULL,
  origin VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  trip_date DATE NOT NULL, 
  fare INTEGER NOT NULL,
  status status NOT NULL DEFAULT 'active',
  created_by SERIAL NOT NULL
);
