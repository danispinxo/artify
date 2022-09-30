DROP TABLE IF EXISTS artworks CASCADE;

CREATE TABLE artworks (
  id SERIAL PRIMARY KEY NOT NULL, 
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE, 
  name VARCHAR(255), 
  price_cents INTEGER, 
  description TEXT, 
  image VARCHAR(255)
);