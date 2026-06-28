const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/auth.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logoutUser);

module.exports = router;