const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);