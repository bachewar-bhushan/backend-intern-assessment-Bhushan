// src/app.js

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

/* ===================== CORS CONFIG (FINAL) ===================== */

// Allowed fixed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-intern-assessment-bhushan-v.vercel.app", // Vercel production
];

// Allow ALL Vercel preview subdomains
const vercelPreviewRegex =
  /^https:\/\/backend-intern-assessment-bhushan-.*\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      // Allow fixed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview URLs
      if (vercelPreviewRegex.test(origin)) {
        return callback(null, true);
      }

      // Block everything else
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ===================== MIDDLEWARE ===================== */

app.use(express.json());
app.use(cookieParser());

/* ===================== ROUTES ===================== */

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

/* ===================== TEST ROUTE ===================== */

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
