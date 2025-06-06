// const mongoose = require("mongoose");

// const InstitutionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   country: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   mobile_number: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/^\d{10,15}$/, "Please enter a valid mobile number"]
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
//   },
//   is_verified: {
//     type: Boolean,
//     default: false
//   },
//   password: {
//     type: String,
//     required: false,
//     minlength: 6
//   },
//   otp_verified: {
//     type: Boolean,
//     default: false
//   }
// });

// module.exports = mongoose.model("Institution", InstitutionSchema);


const mongoose = require("mongoose");
const axios = require('axios')

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String, required: true },
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
  is_verified: { type: Boolean, default: false },
  password: { type: String, minlength: 6 },
  otp_verified: { type: Boolean, default: false },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" }
  }
});

async function geocodeAddress(address) {
  const formattedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
    }
    throw new Error("Address not found");
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

InstitutionSchema.pre("save", async function (next) {
  if (!this.isModified("address")) return next();
  const fullAddress = `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country}`;
  const geoData = await geocodeAddress(fullAddress);
  if (!geoData) return next(new Error("Invalid address, unable to get location"));
  this.location.coordinates = [geoData.longitude, geoData.latitude];
  next();
});

const Institution = mongoose.model("Institution", InstitutionSchema);

module.exports = Institution;

