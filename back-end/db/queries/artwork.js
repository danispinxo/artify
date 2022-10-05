const db = require('../../configs/db.config');

const getArtworkByRandom = () => {
  return db
    .query(
      'SELECT * FROM artworks WHERE sold = false ORDER BY random() LIMIT 60;')
    .then((data) => {
      return data.rows;
    });
};

const getCategories = () => {
  return db
    .query(
      'SELECT * FROM categories;')
    .then((data) => {
      return data.rows;
    });
};


const getArtworkById= (artwork_id) => {
  return db
    .query(
      `SELECT * FROM artworks WHERE artworks.id = $1;`, [artwork_id])
    .then((data) => {
      return data.rows[0];
    });
}

const getArtworkByCategoryId= (category_id) => {
  return db
    .query(
      `SELECT users.first_name as firstName, users.last_name as lastName, users.avatar_image as avatarImage, categories.name as categoryName, artworks.user_id, artworks.name as artworkName, artworks.description, artworks.image as artworkImage, artworks.price_cents 
      FROM artworks JOIN users ON user_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE categories.id = $1 AND sold = false;`, [category_id])
    .then((data) => {
      return data.rows;
    });
};

const addNewArtwork = (user_id, category_id, name, price_cents, description, image, sold) => {
  return db
  .query(`
  INSERT INTO artworks (user_id, category_id, name, price_cents, description, image, sold) 
  VALUES
  ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [user_id, category_id, name, price_cents, description, image, sold])
  .then((data) => {
    return data.rows;
  });
}

const getArtworkBySearch= (search) => {
  
  return db
    .query(
      `SELECT * FROM artworks 
      WHERE LOWER(artworks.name) LIKE LOWER($1 || '%');`, [search])
    .then((data) => {
      return data.rows;
    });
};


module.exports = { getArtworkByRandom, getCategories, getArtworkById, getArtworkByCategoryId, addNewArtwork, getArtworkBySearch };