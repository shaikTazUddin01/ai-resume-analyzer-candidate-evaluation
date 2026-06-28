const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard analytics route working",
  });
});

router.get("/job/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job analytics route working",
    jobId: req.params.jobId,
  });
});

module.exports = router;