const router = require('express').Router();
const itemQueries = require("../db/queries/artwork");

router.put("/", (req, res) => {
  console.log('made itdfdsfdsfsdafdsafdsfdsfsda')
  itemQueries.soldArtworkByOrderId(req.body.orderId)
  .then((artwork) => {
    return res.json(artwork)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;