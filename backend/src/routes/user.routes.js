const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
  changePassword,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.put("/me/password", authMiddleware, changePassword);

module.exports = router;
