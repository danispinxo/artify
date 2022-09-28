const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ users: ["Mohammed", "Dani", "Jeff"] });
});



module.exports = router;