const express = require("express");
const {
  uploadResumeController,
  getAllResumes,
  getResumesByJob,
  getSingleResume,
  deleteResume,
} = require("../controllers/resume.controller");

const { protect } = require("../middlewares/auth.middleware");
const { uploadResume } = require("../middlewares/upload.middleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  uploadResume.single("resumeFile"),
  uploadResumeController
);

router.get("/", protect, getAllResumes);
router.get("/job/:jobId", protect, getResumesByJob);
router.get("/:resumeId", protect, getSingleResume);
router.delete("/:resumeId", protect, deleteResume);

module.exports = router;