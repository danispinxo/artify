const router = require('express').Router();
const ratingQueries = require("../db/queries/ratings");

router.post("/add", (req, res) => {
  const customer_id = req.body.customer_id;
  const artist_id = req.body.artist_id;
  const rating = req.body.rating;
  ratingQueries.addRating(customer_id, artist_id, rating)
  .then((artworks) => {
    return res.json(artworks)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;