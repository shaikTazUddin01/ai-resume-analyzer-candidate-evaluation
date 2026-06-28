const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume upload route working",
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all resumes route working",
  });
});

router.get("/job/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get resumes by job route working",
    jobId: req.params.jobId,
  });
});

router.delete("/:resumeId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete resume route working",
    resumeId: req.params.resumeId,
  });
});

module.exports = router;