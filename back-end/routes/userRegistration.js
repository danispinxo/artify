const router = require('express').Router();
const itemQueries = require("../db/queries/users");
const bcrypt =require('bcrypt');


router.post("/", async (req, res) => {

  try{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.data.password, salt )
    const userObj = req.body.data
    const userData = {...userObj, password: hashedPassword}
    itemQueries.addUser(userData)
    .then((users) => {
      return res.json(users)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
  }  
  catch{
    res.status(500).send()
  }
});

module.exports = router;