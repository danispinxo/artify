const db = require("../connection");

const addUser = (email, name, phone) => {
  return db
    .query(
      `INSERT INTO users (name, email_address, phone_number) VALUES ($1, $2,$3)`,[name,email,phone])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { addUser };