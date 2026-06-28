const express = require("express");
const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getAllJobs);
router.get("/:jobId", protect, getSingleJob);
router.put("/:jobId", protect, updateJob);
router.delete("/:jobId", protect, deleteJob);

module.exports = router;