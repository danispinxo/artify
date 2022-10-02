const db = require('../../configs/db.config');

const getAllSoldByUser = (user_id) => {
  return db
    .query(`
      SELECT * FROM orders
      JOIN line_items ON orders.id = line_items.order_id
      JOIN artworks ON line_items.artwork_id = artworks.id
      WHERE user_id = $1
      ORDER BY order_date DESC;
      `, [user_id])
    .then((data) => {
      return data.rows;
    });
};

const getAllPurchasedByUser = (user_id) => {
  return db
    .query(`
      SELECT * FROM orders
      JOIN line_items ON orders.id = line_items.order_id
      JOIN artworks ON line_items.artwork_id = artworks.id
      WHERE orders.customer_id = $1
    `, [user_id])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getAllSoldByUser, getAllPurchasedByUser };