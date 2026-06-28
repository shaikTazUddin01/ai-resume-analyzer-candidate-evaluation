const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const Shortlist = require("../models/Shortlist");

// @desc Get dashboard analytics
// @route GET /api/v1/analytics/dashboard
const getDashboardAnalytics = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const analyzedResumes = await Analysis.countDocuments();
    const shortlistedCandidates = await Shortlist.countDocuments();

    const scoreStats = await Analysis.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$aiScore" },
          averageMatchPercentage: { $avg: "$matchPercentage" },
          highestScore: { $max: "$aiScore" },
          lowestScore: { $min: "$aiScore" },
        },
      },
    ]);

    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title experienceLevel status createdAt");

    const recentResumes = await Resume.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("candidateName candidateEmail fileName status createdAt")
      .populate("jobId", "title");

    const topCandidates = await Analysis.find()
      .sort({ matchPercentage: -1, aiScore: -1 })
      .limit(5)
      .select("candidateName candidateEmail aiScore matchPercentage recommendation")
      .populate("jobId", "title");

    const stats = scoreStats[0] || {
      averageScore: 0,
      averageMatchPercentage: 0,
      highestScore: 0,
      lowestScore: 0,
    };

    res.status(200).json({
      success: true,
      analytics: {
        totalJobs,
        totalResumes,
        analyzedResumes,
        shortlistedCandidates,
        averageScore: Math.round(stats.averageScore || 0),
        averageMatchPercentage: Math.round(stats.averageMatchPercentage || 0),
        highestScore: stats.highestScore || 0,
        lowestScore: stats.lowestScore || 0,
        recentJobs,
        recentResumes,
        topCandidates,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard analytics",
      error: error.message,
    });
  }
};

// @desc Get analytics by job
// @route GET /api/v1/analytics/job/:jobId
const getJobAnalytics = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    const totalApplicants = await Resume.countDocuments({ jobId });
    const analyzedApplicants = await Analysis.countDocuments({ jobId });
    const shortlistedApplicants = await Shortlist.countDocuments({ jobId });

    const scoreStats = await Analysis.aggregate([
      { $match: { jobId: job._id } },
      {
        $group: {
          _id: "$jobId",
          averageScore: { $avg: "$aiScore" },
          averageMatchPercentage: { $avg: "$matchPercentage" },
          highestScore: { $max: "$aiScore" },
          lowestScore: { $min: "$aiScore" },
        },
      },
    ]);

    const topCandidates = await Analysis.find({ jobId })
      .sort({ matchPercentage: -1, aiScore: -1 })
      .limit(5)
      .select("candidateName candidateEmail aiScore matchPercentage recommendation");

    const stats = scoreStats[0] || {
      averageScore: 0,
      averageMatchPercentage: 0,
      highestScore: 0,
      lowestScore: 0,
    };

    res.status(200).json({
      success: true,
      analytics: {
        jobId,
        jobTitle: job.title,
        totalApplicants,
        analyzedApplicants,
        shortlistedApplicants,
        averageScore: Math.round(stats.averageScore || 0),
        averageMatchPercentage: Math.round(stats.averageMatchPercentage || 0),
        highestScore: stats.highestScore || 0,
        lowestScore: stats.lowestScore || 0,
        topCandidates,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve job analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getJobAnalytics,
};