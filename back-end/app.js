require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const {ENVIROMENT, PORT} = process.env;
const app = express();

// Middleware
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// Separated Routes for each Resource
//const widgetApiRoutes = require('./routes/widgets-api');
const testRoute = require("./routes/users");
const galleryRoute = require("./routes/gallery");

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/users", testRoute)
app.use("/gallery", galleryRoute)

//Home page
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
