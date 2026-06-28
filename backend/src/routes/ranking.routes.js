const express = require("express");
const {
  generateRanking,
  getRankingByJob,
} = require("../controllers/ranking.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/generate/:jobId", protect, generateRanking);
router.get("/job/:jobId", protect, getRankingByJob);

module.exports = router;