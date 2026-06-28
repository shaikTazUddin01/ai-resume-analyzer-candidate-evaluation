const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: [true, "Resume ID is required"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
    aiScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    matchPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    recommendation: {
      type: String,
      enum: ["Highly Recommended", "Recommended", "Average", "Not Recommended"],
      default: "Average",
    },
    summary: {
      type: String,
      default: "",
    },
    analyzedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aiProvider: {
      type: String,
      enum: ["gemini", "n8n", "fallback"],
      default: "fallback",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Analysis || mongoose.model("Analysis", analysisSchema);