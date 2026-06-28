const path = require("path");
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const extractResumeText = require("../utils/extractResumeText");

// @desc Upload resume
// @route POST /api/v1/resumes/upload
const uploadResumeController = async (req, res) => {
  try {
    const { jobId, candidateName, candidateEmail, phone } = req.body;

    if (!jobId || !candidateName || !candidateEmail) {
      return res.status(400).json({
        success: false,
        message: "Job ID, candidate name and candidate email are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase().replace(".", "");

    let extractedText = "";

    try {
      extractedText = await extractResumeText(filePath);
    } catch (error) {
      extractedText = "";
    }

    const resume = await Resume.create({
      jobId,
      candidateName,
      candidateEmail,
      phone,
      fileName: req.file.filename,
      filePath,
      fileType: ext,
      extractedText,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};

// @desc Get all resumes
// @route GET /api/v1/resumes
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate("jobId", "title requiredSkills experienceLevel")
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve resumes",
      error: error.message,
    });
  }
};

// @desc Get resumes by job
// @route GET /api/v1/resumes/job/:jobId
const getResumesByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const resumes = await Resume.find({ jobId })
      .populate("jobId", "title requiredSkills experienceLevel")
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve resumes by job",
      error: error.message,
    });
  }
};

// @desc Get single resume
// @route GET /api/v1/resumes/:resumeId
const getSingleResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId)
      .populate("jobId", "title description requiredSkills experienceLevel")
      .populate("uploadedBy", "name email role");

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve resume",
      error: error.message,
    });
  }
};

// @desc Delete resume
// @route DELETE /api/v1/resumes/:resumeId
const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await Resume.findByIdAndDelete(resumeId);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResumeController,
  getAllResumes,
  getResumesByJob,
  getSingleResume,
  deleteResume,
};