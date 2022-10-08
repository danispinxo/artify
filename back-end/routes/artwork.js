const router = require('express').Router();
const itemQueries = require("../db/queries/artwork");
const orderQueries = require("../db/queries/orders");

router.get("/", (req, res) => {
  itemQueries.getArtworkById(req.query.id)
  .then((artwork) => {
    return res.json(artwork)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.post("/add-to-cart", (req, res) => {
  orderQueries.addArtworkToCart(req.body)
  .then((artwork) => {
    return res.json(artwork)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.post("/rem-from-cart", (req, res) => {
  orderQueries.removeArtworkFromCart(req.body)
  .then((artwork) => {
    return res.json(artwork)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;