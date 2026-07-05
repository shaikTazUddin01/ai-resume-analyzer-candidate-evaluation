const path = require("path");
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const extractResumeText = require("../utils/extractResumeText");

const uploadResumeController = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Resume files are required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    const resumes = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase().replace(".", "");

      let extractedText = "";

      try {
        extractedText = await extractResumeText(file.path);
      } catch {
        extractedText = "";
      }

      const resume = await Resume.create({
        jobId,
        fileName: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        fileType: ext,
        extractedText,
        uploadedBy: req.user._id,
      });

      resumes.push(resume);
    }

    res.status(201).json({
      success: true,
      message: "Resumes uploaded successfully",
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload resumes",
      error: error.message,
    });
  }
};

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