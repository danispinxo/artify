const db = require('../../configs/db.config');

const getArtworkByRandom = () => {
  return db
    .query(
      'SELECT artworks.image FROM artworks order by random() LIMIT 20;')
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

module.exports = { getArtworkByRandom, getCategories };