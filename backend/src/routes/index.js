const express = require("express");

const authRoutes = require("./auth.routes");
const jobRoutes = require("./job.routes");
const resumeRoutes = require("./resume.routes");
const analysisRoutes = require("./analysis.routes");
const rankingRoutes = require("./ranking.routes");
const shortlistRoutes = require("./shortlist.routes");
const analyticsRoutes = require("./analytics.routes");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/jobs",
    route: jobRoutes,
  },
  {
    path: "/resumes",
    route: resumeRoutes,
  },
  {
    path: "/analysis",
    route: analysisRoutes,
  },
  {
    path: "/ranking",
    route: rankingRoutes,
  },
  {
    path: "/shortlist",
    route: shortlistRoutes,
  },
  {
    path: "/analytics",
    route: analyticsRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;