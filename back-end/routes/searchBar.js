const router = require('express').Router();
const itemQueries = require("../db/queries/artwork");

router.post("/", (req, res) => {
  
  
  itemQueries.getArtworkBySearch(req.body.searchInput)
  .then((artworks) => {
    console.log(artworks,'artworks')
    return res.json(artworks)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;