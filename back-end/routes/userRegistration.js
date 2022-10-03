const router = require('express').Router();
const itemQueries = require("../db/queries/users");

router.post("/", (req, res) => {
  console.log(req.body.data, 'req data body')
  itemQueries.addUser(req.body.data)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;