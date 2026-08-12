const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");

const {
  runResumeAnalysisWorkflow,
} = require("../services/n8n.service");

/*
|--------------------------------------------------------------------------
| BULK ANALYZE ALL RESUMES OF A JOB
|--------------------------------------------------------------------------
*/

const analyzeJobResumes = async (req, res) => {
  try {
    const { jobId } = req.params;

    // -----------------------------
    // 1. Find Job
    // -----------------------------

    const job = await Job.findById(jobId);

    


    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    // -----------------------------
    // 2. Find all resumes for Job
    // -----------------------------

    const resumes = await Resume.find({
      jobId,
    });

    

    if (!resumes.length) {
      return res.status(404).json({
        success: false,
        message: "No resumes found for this job",
      });
    }

    // -----------------------------
    // 3. Make sure resume text exists
    // -----------------------------

    const validResumes = resumes.filter(
      (resume) =>
        resume.extractedText &&
        resume.extractedText.trim().length > 0
    );

    if (!validResumes.length) {
      return res.status(400).json({
        success: false,
        message:
          "No resume contains extracted text for AI analysis",
      });
    }

    // -----------------------------
    // 4. Prepare n8n Payload
    // -----------------------------

    const payload = {
      jobId: job._id.toString(),

      job: {
        id: job._id.toString(),

        title: job.title,

        description: job.description || "",

        requiredSkills: Array.isArray(job.requiredSkills)
          ? job.requiredSkills
          : [],

        experienceLevel:
          job.experienceLevel || "",

        employmentType:
          job.employmentType || "",

        location:
          job.location || "",
      },

      resumes: validResumes.map((resume) => ({
        resumeId: resume._id.toString(),

        fileName:
          resume.originalName ||
          resume.fileName,

        text: resume.extractedText,
      })),
    };

    // -----------------------------
    // 5. Send to n8n
    // -----------------------------

    const aiResponse =
      await runResumeAnalysisWorkflow(payload);

    // -----------------------------
    // 6. Validate n8n response
    // -----------------------------

    if (!Array.isArray(aiResponse.results)) {
      return res.status(502).json({
        success: false,
        message:
          "Invalid response received from AI workflow",
      });
    }

    // -----------------------------
    // 7. Save AI Results
    // -----------------------------

    const savedResults = [];

    for (const result of aiResponse.results) {
      if (
        !result.resumeId ||
        result.success === false
      ) {
        continue;
      }

      const analysis =
        await Analysis.findOneAndUpdate(
          {
            resumeId: result.resumeId,
            jobId: job._id,
          },

          {
            resumeId: result.resumeId,
            jobId: job._id,

            candidateName:
              result.candidateName ||
              "Not detected",

            candidateEmail:
              result.candidateEmail ||
              "Not detected",

            candidatePhone:
              result.candidatePhone ||
              "Not detected",

            extractedSkills:
              result.extractedSkills || [],

            education:
              result.education ||
              "Not detected",

            experience:
              result.experience ||
              "Not detected",

            matchedSkills:
              result.matchedSkills || [],

            missingSkills:
              result.missingSkills || [],

            matchPercentage:
              result.matchPercentage || 0,

            aiScore:
              result.aiScore || 0,

            recommendation:
              result.recommendation ||
              "Average",

            summary:
              result.summary || "",

            aiProvider:
              "Gemini via n8n",

            status:
              "completed",
          },

          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        );

      /*
      -------------------------------------
      Update Resume status
      -------------------------------------
      */

      await Resume.findByIdAndUpdate(
        result.resumeId,
        {
          status: "analyzed",
        }
      );

      savedResults.push(analysis);
    }

    // -----------------------------
    // 8. Return result
    // -----------------------------

    return res.status(200).json({
      success: true,

      message:
        "Bulk AI analysis completed successfully",

      jobId,

      totalResumes:
        validResumes.length,

      totalAnalyzed:
        savedResults.length,

      totalFailed:
        aiResponse.totalFailed || 0,

      results:
        savedResults,

      aiErrors:
        aiResponse.errors || [],
    });
  } catch (error) {
    console.error(
      "Bulk AI Analysis Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "AI resume analysis failed",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL ANALYSIS
|--------------------------------------------------------------------------
*/

const getAllAnalysis = async (req, res) => {
  try {
    const results = await Analysis.find()
      .populate(
        "jobId",
        "title requiredSkills experienceLevel"
      )
      .populate(
        "resumeId",
        "fileName originalName status"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve analysis results",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ANALYSIS BY JOB
|--------------------------------------------------------------------------
*/

const getAnalysisByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const results = await Analysis.find({
      jobId,
    })
      .populate(
        "jobId",
        "title requiredSkills experienceLevel"
      )
      .populate(
        "resumeId",
        "fileName originalName status"
      )
      .sort({
        matchPercentage: -1,
        aiScore: -1,
      });

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve job analysis",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE ANALYSIS
|--------------------------------------------------------------------------
*/

const getSingleAnalysis = async (
  req,
  res
) => {
  try {
    const { analysisId } = req.params;

    const result =
      await Analysis.findById(
        analysisId
      )
        .populate("jobId")
        .populate("resumeId");

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Analysis result not found",
      });
    }

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve analysis",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeJobResumes,
  getAllAnalysis,
  getAnalysisByJob,
  getSingleAnalysis,
};