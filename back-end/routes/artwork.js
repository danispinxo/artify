const router = require('express').Router();
const itemQueries = require("../db/queries/artwork");

router.get("/", (req, res) => {
  itemQueries.getArtworkById(req.query.id)
  .then((artwork) => {
    return res.json(artwork)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;