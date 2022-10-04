const router = require('express').Router();
const itemQueries = require("../db/queries/users");



router.get("/", (req, res) => {
  
  if (req.session.user) {
    return itemQueries.getUserById(req.session.user)
    .then(([user]) => {
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
  } 
   res.json({});
});

module.exports = router;