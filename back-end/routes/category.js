const router = require('express').Router();
const itemQueries = require("../db/queries/artwork");

router.get("/", (req, res) => {
  itemQueries.getCategories()
  .then((categories) => {
    return res.json(categories)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;