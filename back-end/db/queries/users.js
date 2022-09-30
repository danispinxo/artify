const db = require("../connection");

const getUsers = () => {
  return db
    .query(
      'SELECT users.first_name as name, users.last_name as surname, users.email as email FROM users;')
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers };