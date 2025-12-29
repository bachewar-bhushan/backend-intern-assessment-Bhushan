// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,          // no duplicates
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,       
      minlength: 6,
      select: false,        
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
