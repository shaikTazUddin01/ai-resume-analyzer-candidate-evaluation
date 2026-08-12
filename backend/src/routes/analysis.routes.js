const express = require("express");

const {
  analyzeJobResumes,
  getAllAnalysis,
  getAnalysisByJob,
  getSingleAnalysis,
} = require("../controllers/analysis.controller");

const {
  protect,
} = require("../middlewares/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Bulk AI Analysis
|--------------------------------------------------------------------------
*/

router.post(
  "/analyze-job/:jobId",
  protect,
  analyzeJobResumes
);

/*
|--------------------------------------------------------------------------
| Get Analysis Results
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  getAllAnalysis
);

router.get(
  "/job/:jobId",
  protect,
  getAnalysisByJob
);

router.get(
  "/:analysisId",
  protect,
  getSingleAnalysis
);

module.exports = router;