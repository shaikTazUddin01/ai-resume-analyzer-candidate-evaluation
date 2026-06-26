const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Fields: name email password role
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
