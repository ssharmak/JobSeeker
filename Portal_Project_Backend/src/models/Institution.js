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

const axios=require("axios");
const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  // country: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: {
        type: String,
        required: true,
        // enum: validCountries
    }},
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
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" } // [longitude, latitude]
}
});


// Function to geocode the address directly inside the schema
async function geocodeAddress(address) {
  const formattedAddress = encodeURIComponent(address); // Encode the address for URL compatibility
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`;

  try {
      const response = await axios.get(url);

      // Check if response data exists and has a valid result
      if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          return {
              latitude: parseFloat(lat), // Convert latitude to float
              longitude: parseFloat(lon) // Convert longitude to float
          };
      } else {
          throw new Error('Address not found');
      }
  } catch (error) {
      console.error('Error during geocoding:', error);
      return null;
  }
}

// Pre-save hook to fetch coordinates before saving
InstitutionSchema.pre("save", async function (next) {
  if (!this.isModified("address")) return next(); // Skip if address hasn't changed

  const fullAddress = `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country}`;
  const geoData = await geocodeAddress(fullAddress);

  if (!geoData) return next(new Error("Invalid address, unable to get location"));

  this.location.coordinates = [geoData.longitude, geoData.latitude]; // MongoDB expects [lng, lat]
  next();
});



const Institution = mongoose.model("Institution", InstitutionSchema);
module.exports=Institution;
