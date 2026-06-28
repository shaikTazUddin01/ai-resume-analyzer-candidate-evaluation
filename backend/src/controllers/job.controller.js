const Job = require("../models/Job");

// @desc Create job criteria
// @route POST /api/v1/jobs
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      experienceLevel,
      employmentType,
      location,
      salaryRange,
    } = req.body;

    if (!title || !description || !requiredSkills) {
      return res.status(400).json({
        success: false,
        message: "Title, description and required skills are required",
      });
    }

    let skillsArray = requiredSkills;

    if (typeof requiredSkills === "string") {
      skillsArray = requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(skillsArray) || skillsArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Required skills must be a non-empty array or comma separated string",
      });
    }

    const job = await Job.create({
      title,
      description,
      requiredSkills: skillsArray,
      experienceLevel,
      employmentType,
      location,
      salaryRange,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job criteria created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create job criteria",
      error: error.message,
    });
  }
};

// @desc Get all job criteria
// @route GET /api/v1/jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve jobs",
      error: error.message,
    });
  }
};

// @desc Get single job criteria
// @route GET /api/v1/jobs/:jobId
const getSingleJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("createdBy", "name email role");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve job",
      error: error.message,
    });
  }
};

// @desc Update job criteria
// @route PUT /api/v1/jobs/:jobId
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    const updateData = { ...req.body };

    if (updateData.requiredSkills && typeof updateData.requiredSkills === "string") {
      updateData.requiredSkills = updateData.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job criteria updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update job criteria",
      error: error.message,
    });
  }
};

// @desc Delete job criteria
// @route DELETE /api/v1/jobs/:jobId
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      success: true,
      message: "Job criteria deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job criteria",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};