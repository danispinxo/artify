DROP TABLE IF EXISTS commissions CASCADE;

CREATE TABLE commissions ( 
  id SERIAL PRIMARY KEY NOT NULL, 
  customer_id INTEGER REFERENCES users(id), 
  artist_id INTEGER REFERENCES users(id), 
  complete BOOLEAN, 
  description TEXT
);