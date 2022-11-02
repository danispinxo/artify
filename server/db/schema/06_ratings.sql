DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings ( 
  id SERIAL PRIMARY KEY NOT NULL, 
  artist_id INTEGER REFERENCES users(id), 
  customer_id INTEGER REFERENCES users(id), 
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  rating INT
);