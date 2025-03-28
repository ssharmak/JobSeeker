const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  mobile_number: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10,15}$/, "Please enter a valid mobile number"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: false,
    minlength: 6
  },
  otp_verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Institution", InstitutionSchema);
