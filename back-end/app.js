require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const {ENVIROMENT, PORT} = process.env;
const app = express();
const cloudinary = require('cloudinary').v2;

// Middleware
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

// Separated Routes for each Resource
const galleryRoute = require("./routes/gallery");
const homepageCarousel = require("./routes/homepage");
const homepageCategories = require("./routes/category");
const profileInformation = require("./routes/profile");
const orderRoutes = require("./routes/order");
const artworkRoutes = require("./routes/artwork");
const categoryItemRoutes = require("./routes/categoryItem");

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/gallery", galleryRoute);
app.use("/homepage/api", homepageCarousel);
app.use("/categories/api", homepageCategories);
app.use("/api/profile", profileInformation);
app.use("/order/api", orderRoutes);
app.use("/api/product", artworkRoutes);
app.use("/api/categoryItem", categoryItemRoutes);

//Home page
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
