const router = require('express').Router();
const itemQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  itemQueries.getArtworkByRandom()
  .then((artworks) => {
    return res.json(artworks)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;