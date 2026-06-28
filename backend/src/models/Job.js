const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required skills are required"],
      validate: {
        validator: function (skills) {
          return skills.length > 0;
        },
        message: "At least one required skill is needed",
      },
    },
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level", "Expert"],
      default: "Entry Level",
    },
    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract", "Remote"],
      default: "Full Time",
    },
    location: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    salaryRange: {
      type: String,
      trim: true,
      default: "Negotiable",
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);