const router = require('express').Router();
const orderQueries = require("../db/queries/orders");

router.get("/sold", (req, res) => {
  orderQueries.getAllSoldByUser(5)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.get("/purchased", (req, res) => {
  orderQueries.getAllPurchasedByUser(5)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;