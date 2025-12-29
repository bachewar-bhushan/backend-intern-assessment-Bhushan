// src/app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // 🔑 allow cookies
  })
);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
// test route
app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
