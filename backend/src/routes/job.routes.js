const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Create job route working",
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all jobs route working",
  });
});

router.get("/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get single job route working",
    jobId: req.params.jobId,
  });
});

router.put("/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update job route working",
    jobId: req.params.jobId,
  });
});

router.delete("/:jobId", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete job route working",
    jobId: req.params.jobId,
  });
});

module.exports = router;