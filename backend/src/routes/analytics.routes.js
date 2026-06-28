const express = require("express");
const {
  getDashboardAnalytics,
  getJobAnalytics,
} = require("../controllers/analytics.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/dashboard", protect, getDashboardAnalytics);
router.get("/job/:jobId", protect, getJobAnalytics);

module.exports = router;