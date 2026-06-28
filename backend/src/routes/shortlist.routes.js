const express = require("express");
const {
  generateShortlist,
  getShortlistByJob,
  updateShortlistStatus,
  deleteShortlistRecord,
} = require("../controllers/shortlist.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/generate/:jobId", protect, generateShortlist);
router.get("/job/:jobId", protect, getShortlistByJob);
router.put("/:shortlistId/status", protect, updateShortlistStatus);
router.delete("/:shortlistId", protect, deleteShortlistRecord);

module.exports = router;