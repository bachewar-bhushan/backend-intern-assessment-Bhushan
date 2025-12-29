// src/app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
// test route
app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
