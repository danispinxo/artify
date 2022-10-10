const router = require('express').Router();
const userQueries = require("../db/queries/ratings");

router.get("/", (req, res) => {
  userQueries.getUsersByRating()
  .then((users) => {
    return res.json(users)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;