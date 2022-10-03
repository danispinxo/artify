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
      'SELECT categories.name, categories.image FROM categories;')
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

module.exports = { getArtworkByRandom, getCategories, getArtworkById };