const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Fields: resumeId jobId skills education experience aiScore matchPercentage summary recommendation
}, { timestamps: true });

module.exports = mongoose.model('Analysis', schema);
