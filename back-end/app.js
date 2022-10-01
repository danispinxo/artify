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
const galleryRoute = require("./routes/gallery");
const homepageCarousel = require("./routes/homepage");
const homepageCategories = require("./routes/category");

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/gallery/api", galleryRoute);
app.use("/homepage/api", homepageCarousel);
app.use("/categories/api", homepageCategories);

//Home page
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
