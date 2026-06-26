const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Fields: candidateName candidateEmail jobId filePath status
}, { timestamps: true });

module.exports = mongoose.model('Resume', schema);
