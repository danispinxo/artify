const router = require('express').Router();
const userQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  userQueries.getUserById(5)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.put("/", (req, res) => {
  userQueries.editUser(req.body)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;