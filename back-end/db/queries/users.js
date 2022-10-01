const db = require('../../configs/db.config');

const getUsers = () => {
  return db
    .query(
      'SELECT users.first_name as name, users.last_name as surname, users.email as email, users.avatar_image as avatar FROM users;')
    .then((data) => {
      return data.rows;
    });
};

const getArtByUser = (user_id) => {
  return db
    .query(
      'SELECT * FROM artworks WHERE user_id = $1;', [user_id])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers, getArtByUser };