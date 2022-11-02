const router = require('express').Router();

router.get("/", (req, res) => {
 return res.json(req.session.user)

});

module.exports = router;