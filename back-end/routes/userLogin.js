const router = require('express').Router();
const itemQueries = require("../db/queries/users");
const bcrypt =require('bcrypt');


router.post("/", (req, res) => {

  let email = req.body.data.email
  let password = req.body.data.password
  
  itemQueries.authenticateUser(email)
  .catch((err) => {
    return res.status(500).send({message: "Error: Unable to log in!"})
  })
  .then((user) => {
    return bcrypt.compare(password, user[0].password).then((result) => {
      if(result) {
        return user
      } else {
        throw result
      }
    })
  }).then((user) => {
    req.session.user = user[0].id
    return res.json(user[0])
  })
  .catch((error) => {
    return res.status(403).send({message: "Incorrect Password/email"})
  })

  
});

module.exports = router;
