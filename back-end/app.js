require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const {ENVIROMENT, PORT} = process.env;
const app = express();
const cookieSession = require('cookie-session');

// Middleware
app.use(morgan('dev'));
const cloudinary = require('cloudinary').v2;

// Middleware
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['totallynotasecretkey'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
// console.log(cloudinary.config());

// Separated Routes for each Resource
const galleryRoute = require("./routes/gallery");
const homepageCarousel = require("./routes/homepage");
const homepageCategories = require("./routes/category");
const profileInformation = require("./routes/profile");
const orderRoutes = require("./routes/order");
const artworkRoutes = require("./routes/artwork");
const categoryItemRoutes = require("./routes/categoryItem");
const userRegistrationRoutes = require("./routes/userRegistration");
const userLogin = require("./routes/userLogin");
const userSession = require("./routes/userSession");
const artworkSearch = require("./routes/searchBar");
const artistRoutes = require("./routes/artists");
const paymentRoutes = require("./routes/payment");
const emptyCartRoutes = require("./routes/emptyCart");
const soldRoutes = require("./routes/sold");
const emailRoutes = require("./routes/email");
const changePasswordRoute = require("./routes/changePassword");
const profileAuthRoute = require("./routes/profileAuth");


// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/gallery", galleryRoute);
app.use("/homepage/api", homepageCarousel);
app.use("/categories/api", homepageCategories);
app.use("/api/profile", profileInformation);
app.use("/order/api", orderRoutes);
app.use("/api/product", artworkRoutes);
app.use("/api/categoryItem", categoryItemRoutes);
app.use("/register", userRegistrationRoutes);
app.use("/login", userLogin);
app.use("/api/session", userSession);
app.use("/api/search", artworkSearch);
app.use("/api/artists", artistRoutes);
app.use("/payment", paymentRoutes);
app.use("/emptycart", emptyCartRoutes);
app.use("/sold", soldRoutes);
app.use("/email", emailRoutes);
app.use("/password/reset", changePasswordRoute);
app.use("/profile/auth", profileAuthRoute);

//Home page
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.send('Logged out')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
