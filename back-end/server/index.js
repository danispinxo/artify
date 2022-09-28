const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api", (req, res) => {
  res.json({ users: ["Mohammed", "Dani", "Jeff"] });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
