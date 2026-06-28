const Analysis = require("../models/Analysis");

// @desc Generate candidate ranking by job
// @route POST /api/v1/ranking/generate/:jobId
const generateRanking = async (req, res) => {
  try {
    const { jobId } = req.params;

    const results = await Analysis.find({ jobId })
      .populate("resumeId", "candidateName candidateEmail fileName status")
      .populate("jobId", "title requiredSkills experienceLevel")
      .sort({ matchPercentage: -1, aiScore: -1 });

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No analysis results found for this job",
      });
    }

    const ranking = results.map((item, index) => ({
      rank: index + 1,
      analysisId: item._id,
      resumeId: item.resumeId?._id,
      candidateName: item.candidateName,
      candidateEmail: item.candidateEmail,
      jobTitle: item.jobId?.title,
      aiScore: item.aiScore,
      matchPercentage: item.matchPercentage,
      matchedSkills: item.matchedSkills,
      missingSkills: item.missingSkills,
      recommendation: item.recommendation,
      summary: item.summary,
    }));

    res.status(200).json({
      success: true,
      message: "Candidate ranking generated successfully",
      jobId,
      totalCandidates: ranking.length,
      ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate ranking",
      error: error.message,
    });
  }
};

// @desc Get candidate ranking by job
// @route GET /api/v1/ranking/job/:jobId
const getRankingByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const results = await Analysis.find({ jobId })
      .populate("resumeId", "candidateName candidateEmail fileName status")
      .populate("jobId", "title requiredSkills experienceLevel")
      .sort({ matchPercentage: -1, aiScore: -1 });

    const ranking = results.map((item, index) => ({
      rank: index + 1,
      analysisId: item._id,
      resumeId: item.resumeId?._id,
      candidateName: item.candidateName,
      candidateEmail: item.candidateEmail,
      jobTitle: item.jobId?.title,
      aiScore: item.aiScore,
      matchPercentage: item.matchPercentage,
      matchedSkills: item.matchedSkills,
      missingSkills: item.missingSkills,
      recommendation: item.recommendation,
      summary: item.summary,
    }));

    res.status(200).json({
      success: true,
      jobId,
      totalCandidates: ranking.length,
      ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ranking",
      error: error.message,
    });
  }
};

module.exports = {
  generateRanking,
  getRankingByJob,
};