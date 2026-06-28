const Resume = require("../models/Resume");
const Job = require("../models/Job");
const Analysis = require("../models/Analysis");
const { analyzeWithGemini } = require("../services/gemini.service");
const { analyzeWithN8n } = require("../services/n8n.service");

const generateFallbackAnalysis = (resumeText, job) => {
  const text = (resumeText || "").toLowerCase();

  const requiredSkills = job.requiredSkills || [];

  const matchedSkills = requiredSkills.filter((skill) =>
    text.includes(skill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !text.includes(skill.toLowerCase())
  );

  const matchPercentage =
    requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

  let recommendation = "Not Recommended";

  if (matchPercentage >= 80) recommendation = "Highly Recommended";
  else if (matchPercentage >= 60) recommendation = "Recommended";
  else if (matchPercentage >= 40) recommendation = "Average";

  return {
    extractedSkills: matchedSkills,
    education: text.includes("b.sc") || text.includes("bachelor")
      ? "Bachelor degree detected"
      : "Not detected",
    experience: text.includes("experience")
      ? "Experience information detected"
      : "Not detected",
    matchedSkills,
    missingSkills,
    aiScore: matchPercentage,
    matchPercentage,
    recommendation,
    summary: `Candidate matched ${matchedSkills.length} out of ${requiredSkills.length} required skills.`,
  };
};

// @desc Analyze resume
// @route POST /api/v1/analysis/analyze
const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobId } = req.body;

    if (!resumeId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID and Job ID are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    let aiResult = null;
    let aiProvider = "fallback";

    aiResult = await analyzeWithN8n({
      resumeText: resume.extractedText,
      jobCriteria: job,
      resumeId,
      jobId,
    });

    if (aiResult) {
      aiProvider = "n8n";
    }

    if (!aiResult) {
      aiResult = await analyzeWithGemini({
        resumeText: resume.extractedText,
        jobCriteria: job,
      });

      if (aiResult) {
        aiProvider = "gemini";
      }
    }

    if (!aiResult) {
      aiResult = generateFallbackAnalysis(resume.extractedText, job);
      aiProvider = "fallback";
    }

    const analysis = await Analysis.create({
      resumeId,
      jobId,
      candidateName: resume.candidateName,
      candidateEmail: resume.candidateEmail,
      extractedSkills: aiResult.extractedSkills || [],
      education: aiResult.education || "Not detected",
      experience: aiResult.experience || "Not detected",
      matchedSkills: aiResult.matchedSkills || [],
      missingSkills: aiResult.missingSkills || [],
      aiScore: aiResult.aiScore || 0,
      matchPercentage: aiResult.matchPercentage || 0,
      recommendation: aiResult.recommendation || "Average",
      summary: aiResult.summary || "",
      analyzedBy: req.user._id,
      aiProvider,
    });

    resume.status = "analyzed";
    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume analyzed successfully",
      aiProvider,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};

// @desc Get all analysis
// @route GET /api/v1/analysis
const getAllAnalysis = async (req, res) => {
  try {
    const results = await Analysis.find()
      .populate("resumeId", "candidateName candidateEmail fileName")
      .populate("jobId", "title requiredSkills")
      .populate("analyzedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve analysis results",
      error: error.message,
    });
  }
};

// @desc Get single analysis
// @route GET /api/v1/analysis/:analysisId
const getSingleAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await Analysis.findById(analysisId)
      .populate("resumeId", "candidateName candidateEmail fileName")
      .populate("jobId", "title requiredSkills description")
      .populate("analyzedBy", "name email role");

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis result not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve analysis result",
      error: error.message,
    });
  }
};

// @desc Get analysis by job
// @route GET /api/v1/analysis/job/:jobId
const getAnalysisByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const results = await Analysis.find({ jobId })
      .populate("resumeId", "candidateName candidateEmail fileName")
      .populate("jobId", "title requiredSkills")
      .sort({ aiScore: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve job analysis results",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getAllAnalysis,
  getSingleAnalysis,
  getAnalysisByJob,
};