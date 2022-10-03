require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const AWS = require("aws-sdk");
const {ENVIROMENT, PORT} = process.env;
const app = express();

// Middleware
app.use(upload());
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// s3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // your AWS access id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // your AWS access key
});

// Separated Routes for each Resource
//const widgetApiRoutes = require('./routes/widgets-api');
const galleryRoute = require("./routes/gallery");
const homepageCarousel = require("./routes/homepage");
const homepageCategories = require("./routes/category");
const profileInformation = require("./routes/profile");
const orderRoutes = require("./routes/order");
const artworkRoutes = require("./routes/artwork");
const categoryItemRoutes = require("./routes/categoryItem");
const userRegistrationRoutes = require("./routes/userRegistration");
const userLogin = require("./routes/userLogin");

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

//Home page
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// actual function for uploading file
async function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
    Key: `fileupload/scanskill-${Date.now()}-${file.name}`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
    Body: file.data,
    ACL: "public-read",
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the url location
}

app.post("/upload", async (req, res) => {
  // the file when inserted from form-data comes in req.files.file
  const fileLocation = await uploadFile(req.files.file);

  // returning fileupload location
  return res.status(200).json({ location: fileLocation });
});