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

const getRatingsByUserID = (user_id) => {
  return db
    .query(`
    SELECT * FROM ratings
    WHERE artist_id = $1;
      `, [user_id])
    .then((data) => {
      return data.rows;
    });
};

const getUsersByRating = () => {
  return db
    .query(`
    SELECT users.first_name as firstName, users.last_name as lastName, users.id as user_id, users.avatar_image as avatarImage, rating
    FROM users JOIN ratings ON artist_id = users.id
    GROUP BY firstName, lastName, avatarImage, user_id, rating
    HAVING rating = $1
    LIMIT $2;
      `, [5, 6])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { addRating, getRatingsByUserID, getUsersByRating };