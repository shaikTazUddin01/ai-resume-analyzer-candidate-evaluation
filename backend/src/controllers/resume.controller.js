const fs = require("fs");
const path = require("path");

const Resume = require("../models/Resume");
const Job = require("../models/Job");

const extractResumeText = require("../utils/extractResumeText");

/*
|--------------------------------------------------------------------------
| Upload Multiple Resumes
|--------------------------------------------------------------------------
*/

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

    /*
    |--------------------------------------------------------------------------
    | Check Job
    |--------------------------------------------------------------------------
    */

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job criteria not found",
      });
    }

    const resumes = [];
    const failedFiles = [];

    /*
    |--------------------------------------------------------------------------
    | Process Every Resume
    |--------------------------------------------------------------------------
    */

    for (const file of req.files) {
      try {
        console.log("\n--------------------------------");
        console.log("Processing resume:", file.originalname);
        console.log("Stored file:", file.path);

        /*
        |--------------------------------------------------------------------------
        | Extract Text
        |--------------------------------------------------------------------------
        */

        const extractedText = await extractResumeText(file.path);

        console.log(
          "Extracted characters:",
          extractedText.length
        );

        console.log(
          "Extracted preview:",
          extractedText.substring(0, 200)
        );

        /*
        |--------------------------------------------------------------------------
        | File Type
        |--------------------------------------------------------------------------
        */

        const fileType = path
          .extname(file.originalname)
          .replace(".", "")
          .toLowerCase();

        /*
        |--------------------------------------------------------------------------
        | Save Resume + Extracted Text
        |--------------------------------------------------------------------------
        */

        const resume = await Resume.create({
          jobId,

          fileName: file.filename,

          originalName: file.originalname,

          filePath: file.path,

          fileType,

          extractedText,

          status: "uploaded",

          uploadedBy: req.user._id,
        });

        /*
        |--------------------------------------------------------------------------
        | Populate Job For Frontend
        |--------------------------------------------------------------------------
        */

        await resume.populate(
          "jobId",
          "title requiredSkills experienceLevel"
        );

        resumes.push(resume);
      } catch (error) {
        console.error(
          `Text extraction failed for ${file.originalname}:`,
          error.message
        );

        failedFiles.push({
          fileName: file.originalname,
          message: error.message,
        });

        /*
        |--------------------------------------------------------------------------
        | Delete invalid uploaded file
        |--------------------------------------------------------------------------
        */

        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        } catch (deleteError) {
          console.error(
            "Failed to remove invalid file:",
            deleteError.message
          );
        }
      }
    }

    /*
    |--------------------------------------------------------------------------
    | No Resume Successfully Extracted
    |--------------------------------------------------------------------------
    */

    if (resumes.length === 0) {
      return res.status(422).json({
        success: false,
        message:
          "Resume files were uploaded but no readable text could be extracted.",
        failedFiles,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      success: true,

      message:
        failedFiles.length > 0
          ? "Some resumes uploaded successfully"
          : "All resumes uploaded successfully",

      totalUploaded: resumes.length,

      totalFailed: failedFiles.length,

      resumes,

      failedFiles,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resumes",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Resumes
|--------------------------------------------------------------------------
*/

const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate(
        "jobId",
        "title requiredSkills experienceLevel"
      )
      .populate(
        "uploadedBy",
        "name email role"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve resumes",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Resumes By Job
|--------------------------------------------------------------------------
*/

const getResumesByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const resumes = await Resume.find({
      jobId,
    })
      .populate(
        "jobId",
        "title requiredSkills experienceLevel"
      )
      .populate(
        "uploadedBy",
        "name email role"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve resumes by job",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Resume
|--------------------------------------------------------------------------
*/

const getSingleResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(
      resumeId
    )
      .populate(
        "jobId",
        "title description requiredSkills experienceLevel"
      )
      .populate(
        "uploadedBy",
        "name email role"
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve resume",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Resume
|--------------------------------------------------------------------------
*/

const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(
      resumeId
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Physical File
    |--------------------------------------------------------------------------
    */

    if (
      resume.filePath &&
      fs.existsSync(resume.filePath)
    ) {
      try {
        fs.unlinkSync(resume.filePath);
      } catch (error) {
        console.error(
          "Physical file deletion failed:",
          error.message
        );
      }
    }

    await Resume.findByIdAndDelete(
      resumeId
    );

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
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