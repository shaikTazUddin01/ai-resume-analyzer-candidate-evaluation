const mongoose = require("mongoose");

const shortlistSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    analysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      required: [true, "Analysis ID is required"],
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: [true, "Resume ID is required"],
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
    aiScore: {
      type: Number,
      required: true,
    },
    matchPercentage: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["shortlisted", "in-review", "selected", "rejected"],
      default: "shortlisted",
    },
    remarks: {
      type: String,
      default: "Candidate shortlisted based on AI score and match percentage",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Shortlist || mongoose.model("Shortlist", shortlistSchema);