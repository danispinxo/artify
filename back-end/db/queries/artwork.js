const db = require('../../configs/db.config');

const getArtworkByRandom = () => {
  return db
    .query(
      'SELECT * FROM artworks order by random() LIMIT 40;')
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
      `SELECT categories.name as categoryName, artworks.user_id, artworks.name as artworkName, artworks.description, artworks.image as artworkImage, artworks.price_cents FROM artworks JOIN categories ON category_id = categories.id WHERE categories.id = $1;`, [category_id])
    .then((data) => {
      return data.rows;
    });
}


module.exports = { getArtworkByRandom, getCategories, getArtworkById, getArtworkByCategoryId };