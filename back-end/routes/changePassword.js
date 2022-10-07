const router = require('express').Router();
const itemQueries = require("../db/queries/users");
const bcrypt =require('bcrypt');

router.post("/", async (req, res) => {
  try{
    console.log("THIS IS REQ BODY", req.body);

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt )
    const userObj = req.body
    itemQueries.changePassword(userObj.id, hashedPassword)
    .then((user) => {
      
      return res.json(user)
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