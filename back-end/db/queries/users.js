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

const getUserById = (id) => {
  return db
    .query(
      'SELECT * FROM users WHERE users.id = $1;', [id])
    .then((data) => {
      return data.rows;
    });
};

const editUser = (editedUser) => {
  return db
    .query(`
    UPDATE users
    SET first_name = $2, last_name = $3, bio = $4
    WHERE users.id = $1
    RETURNING *;
    `, [editedUser.id, editedUser.first_name, editedUser.last_name, editedUser.bio])
    .then((data) => {
      return data.rows;
    });
};

const updateAvatar = (user_id, avatar_image) => {
  return db
    .query(`
    UPDATE users
    SET avatar_image = $2
    WHERE users.id = $1
    RETURNING *;
    `, [user_id, avatar_image])
    .then((data) => {
      return data.rows;
    });
};

const updateCover = (user_id, cover_image) => {
  return db
    .query(`
    UPDATE users
    SET cover_image = $2
    WHERE users.id = $1
    RETURNING *;
    `, [user_id, cover_image])
    .then((data) => {
      return data.rows;
    });
};

const addUser = (user) => {
  return db
    .query(`
    INSERT INTO users (first_name, last_name, email, password) VALUES 
  ($1, $2, $3, $4);`, 
    [user.firstName, user.lastName, user.email, user.password])
    .then((data) => {
      return data.rows;
    });
};

const authenticateUser = (email) => {
  return db
    .query(`
    SELECT * FROM users WHERE users.email = $1;`, 
    [email])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers, getArtByUser, getUserById, editUser, addUser, authenticateUser, updateAvatar, updateCover };
