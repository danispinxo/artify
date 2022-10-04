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
    .then((user) => {
      
      req.session.user = user.id // this is the logged in user's id. Can be accessible in every single route
      return res.json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar_image: user.avatar_image,
        bio: user.bio,
        cover_image:user.cover_image
      })
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