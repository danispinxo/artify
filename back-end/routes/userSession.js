const router = require('express').Router();
const itemQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  
  if (req.session.user) {
    return itemQueries.getUserById(req.session.user)
    .then((data) => {
      return res.json(data[0])
    })
  } 
   res.json({});
});

module.exports = router;