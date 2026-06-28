const express = require("express");
const router = express.Router();

router.post("/analyze", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI analysis route working",
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all analysis route working",
  });
});

router.get("/job/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get analysis by job route working",
    jobId: req.params.jobId,
  });
});

router.get("/:analysisId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get single analysis route working",
    analysisId: req.params.analysisId,
  });
});

module.exports = router;