const router = require('express').Router();
const itemQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  itemQueries.getArtByUser(5)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;