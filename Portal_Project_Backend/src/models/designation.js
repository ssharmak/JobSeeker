const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
  DesignationName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Description: {
    type: String,
    required: false
  },
  Level: {
    type: Number,
    required: false, // Example: 1 for Entry-level, 5 for Senior, etc.
    min: 1
  },
  Department: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Designation = mongoose.model("Designation", DesignationSchema);
module.exports = Designation;
