const express = require("express");
const {
  analyzeResume,
  getAllAnalysis,
  getSingleAnalysis,
  getAnalysisByJob,
} = require("../controllers/analysis.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/analyze", protect, analyzeResume);
router.get("/", protect, getAllAnalysis);
router.get("/job/:jobId", protect, getAnalysisByJob);
router.get("/:analysisId", protect, getSingleAnalysis);

module.exports = router;