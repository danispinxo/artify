require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;

// Middleware

app.use(express.urlencoded({ extended: true }));


// Separated Routes for each Resource
//const widgetApiRoutes = require('./routes/widgets-api');
const testRoute = require("./routes/test")


// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api", testRoute)



//Home page
app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
