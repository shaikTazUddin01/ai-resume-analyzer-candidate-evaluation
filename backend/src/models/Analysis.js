const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    candidateName: {
      type: String,
      default: "Not detected",
    },

    candidateEmail: {
      type: String,
      default: "Not detected",
    },

    candidatePhone: {
      type: String,
      default: "Not detected",
    },

    extractedSkills: {
      type: [String],
      default: [],
    },

    education: {
      type: String,
      default: "Not detected",
    },

    experience: {
      type: String,
      default: "Not detected",
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    matchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    recommendation: {
      type: String,
      enum: [
        "Highly Recommended",
        "Recommended",
        "Average",
        "Not Recommended",
      ],
      default: "Average",
    },

    summary: {
      type: String,
      default: "",
    },

    aiProvider: {
      type: String,
      default: "Gemini via n8n",
    },

    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

analysisSchema.index(
  {
    resumeId: 1,
    jobId: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.models.Analysis ||
  mongoose.model("Analysis", analysisSchema);