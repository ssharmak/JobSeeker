const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  LocationName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Address: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  ZipCode: {
    type: String,
    required: false
  },
  Coordinates: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    required: false
  }
}, { timestamps: true });

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
