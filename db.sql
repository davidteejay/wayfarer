CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL, 
  password VARCHAR NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (email, first_name, last_name, password, is_admin) VALUES ('chibuokem_2007@gmail.com', 'Chii', 'Buokem', '00000000', true);
INSERT INTO users (email, first_name, last_name, password) VALUES ('chi@neptunn.com', 'Chii', 'Buokem', '00000000');

CREATE TABLE IF NOT EXISTS buses (
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR NOT NULL UNIQUE,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR NOT NULL, 
  year VARCHAR NOT NULL,
  capacity INTEGER NOT NULL,
  created_by INTEGER NOT NULL
);
INSERT INTO buses (number_plate, manufacturer, model, year, capacity, created_by) VALUES ('KTU19029', 'Toyota', 'Hiace', '2004', 18, 1);

CREATE TYPE status AS ENUM ('active', 'cancelled');
CREATE TABLE IF NOT EXISTS trips (
  id SERIAL PRIMARY KEY,
  bus_id INTEGER NOT NULL,
  origin VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  trip_date DATE NOT NULL, 
  fare INTEGER NOT NULL,
  status status NOT NULL DEFAULT 'active',
  created_by INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL,
  user_id INTEGER NOT NULL,
  trip_id INTEGER NOT NULL,
  created_on DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  seat_number INTEGER,
  PRIMARY KEY(user_id, trip_id)
);
