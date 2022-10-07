const db = require('../../configs/db.config');

const addRating = (customer_id, artist_id, rating) => {
  return db
    .query(`
    INSERT INTO ratings (customer_id, artist_id, rating) 
    VALUES ($1, $2, $3);
      `, [customer_id, artist_id, rating])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { addRating };