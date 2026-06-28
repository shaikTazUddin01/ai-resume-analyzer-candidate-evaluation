const express = require("express");
const router = express.Router();

router.post("/generate/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Generate ranking route working",
    jobId: req.params.jobId,
  });
});

router.get("/job/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get ranking by job route working",
    jobId: req.params.jobId,
  });
});

module.exports = router;