const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Fields: title description requiredSkills experienceLevel createdBy
}, { timestamps: true });

module.exports = mongoose.model('Job', schema);
