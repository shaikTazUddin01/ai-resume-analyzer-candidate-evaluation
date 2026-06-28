const Analysis = require("../models/Analysis");
const Shortlist = require("../models/Shortlist");
const Resume = require("../models/Resume");

// @desc Generate shortlist by job
// @route POST /api/v1/shortlist/generate/:jobId
const generateShortlist = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { minimumScore = 70 } = req.body;

    const analysisResults = await Analysis.find({ jobId })
      .populate("resumeId", "candidateName candidateEmail fileName status")
      .populate("jobId", "title requiredSkills")
      .sort({ matchPercentage: -1, aiScore: -1 });

    if (!analysisResults || analysisResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No analysis results found for this job",
      });
    }

    await Shortlist.deleteMany({ jobId });

    const qualifiedCandidates = analysisResults.filter(
      (item) => item.matchPercentage >= Number(minimumScore)
    );

    if (qualifiedCandidates.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No candidates matched the minimum shortlist score",
        minimumScore: Number(minimumScore),
        shortlistedCandidates: [],
      });
    }

    const shortlistData = qualifiedCandidates.map((item, index) => ({
      jobId: item.jobId?._id || item.jobId,
      analysisId: item._id,
      resumeId: item.resumeId?._id || item.resumeId,
      candidateName: item.candidateName,
      candidateEmail: item.candidateEmail,
      aiScore: item.aiScore,
      matchPercentage: item.matchPercentage,
      rank: index + 1,
      createdBy: req.user._id,
    }));

    const shortlistedCandidates = await Shortlist.insertMany(shortlistData);

    const resumeIds = shortlistedCandidates.map((item) => item.resumeId);
    await Resume.updateMany(
      { _id: { $in: resumeIds } },
      { $set: { status: "shortlisted" } }
    );

    res.status(201).json({
      success: true,
      message: "Shortlist generated successfully",
      minimumScore: Number(minimumScore),
      totalShortlisted: shortlistedCandidates.length,
      shortlistedCandidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate shortlist",
      error: error.message,
    });
  }
};

// @desc Get shortlist by job
// @route GET /api/v1/shortlist/job/:jobId
const getShortlistByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const shortlist = await Shortlist.find({ jobId })
      .populate("jobId", "title requiredSkills experienceLevel")
      .populate("resumeId", "candidateName candidateEmail fileName status")
      .populate("analysisId", "matchedSkills missingSkills recommendation summary")
      .populate("createdBy", "name email role")
      .sort({ rank: 1 });

    res.status(200).json({
      success: true,
      jobId,
      totalShortlisted: shortlist.length,
      shortlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve shortlist",
      error: error.message,
    });
  }
};

// @desc Update shortlist status
// @route PUT /api/v1/shortlist/:shortlistId/status
const updateShortlistStatus = async (req, res) => {
  try {
    const { shortlistId } = req.params;
    const { status, remarks } = req.body;

    const allowedStatus = ["shortlisted", "in-review", "selected", "rejected"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shortlist status",
      });
    }

    const shortlist = await Shortlist.findById(shortlistId);

    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: "Shortlist record not found",
      });
    }

    if (status) shortlist.status = status;
    if (remarks) shortlist.remarks = remarks;

    await shortlist.save();

    res.status(200).json({
      success: true,
      message: "Shortlist status updated successfully",
      shortlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update shortlist status",
      error: error.message,
    });
  }
};

// @desc Delete shortlist record
// @route DELETE /api/v1/shortlist/:shortlistId
const deleteShortlistRecord = async (req, res) => {
  try {
    const { shortlistId } = req.params;

    const shortlist = await Shortlist.findById(shortlistId);

    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: "Shortlist record not found",
      });
    }

    await Shortlist.findByIdAndDelete(shortlistId);

    res.status(200).json({
      success: true,
      message: "Shortlist record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete shortlist record",
      error: error.message,
    });
  }
};

module.exports = {
  generateShortlist,
  getShortlistByJob,
  updateShortlistStatus,
  deleteShortlistRecord,
};