const express = require("express");

const authRoutes = require("./auth.routes");
const jobRoutes = require("./job.routes");
const resumeRoutes = require("./resume.routes");
const analysisRoutes = require("./analysis.routes");
const rankingRoutes = require("./ranking.routes");
const shortlistRoutes = require("./shortlist.routes");
const analyticsRoutes = require("./analytics.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/resumes", resumeRoutes);
router.use("/analysis", analysisRoutes);
router.use("/ranking", rankingRoutes);
router.use("/shortlist", shortlistRoutes);
router.use("/analytics", analyticsRoutes);

module.exports = router;