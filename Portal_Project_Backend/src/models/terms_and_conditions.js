// models/TermsAndConditions.js
const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const  Terms= mongoose.model('Terms', termsAndConditionsSchema);
module.exports=Terms;