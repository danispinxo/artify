DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255), 
  avatar_image VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dckcnn64n/image/upload/v1665063950/avatars/def-av_llfrrr.png', 
  cover_image VARCHAR(255), 
  password VARCHAR(255), 
  bio TEXT
);