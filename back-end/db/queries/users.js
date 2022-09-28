const db = require("../connection");

const getUsers = () => {
  return db
    .query(
      'SELECT users.name as name FROM users;')
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers };