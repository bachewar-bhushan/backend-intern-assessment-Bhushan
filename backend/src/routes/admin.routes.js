const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  activateUser,
  deactivateUser,
  deleteUser,
} = require("../controllers/admin.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.patch("/users/:id/activate", authMiddleware, adminMiddleware, activateUser);
router.patch("/users/:id/deactivate", authMiddleware, adminMiddleware, deactivateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
