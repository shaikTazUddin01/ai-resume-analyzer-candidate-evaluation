const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    candidateName: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: [true, "Candidate email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["uploaded", "analyzed", "shortlisted", "rejected"],
      default: "uploaded",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);