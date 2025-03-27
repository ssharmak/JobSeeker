const mongoose= require('mongoose');
const axios = require("axios");

const recruiter_details=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true, match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']}
});

const jobs_schema= new mongoose.Schema({
Institution_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
title:{type: String, required:true},
department:{type: String, required:true},
address: {
    street: { type: String,required:true },
    city: { type: String,required:true},
    state: { type: String,required:true },
    postal_code: { type: String },
    country: {
        type: String,
        required: true,
        enum: validCountries
    }},
    latitude:{type:String},
    longitude:{type:String},
category:{type:mongoose.Schema.Types.ObjectId,ref: "Category",
    default: null,},
employment_type:{type:String,enum:["Full_time","Internship"],required:true},
experience_level:{type:String,enum:["Fresher","Junior","Mid-Senior","Senior"],required:true},
min_experience:{type:Number,default:0},
max_experience:{type:Number,default:null},
description:{type:String,required:true},
requirements:{type:[String],required:true},
prefered_qualifications:{type:[String],required:true},
responsibilities:{type:[String],required:true},
benefits:{type:[String],required:true},
posted_date:{type:Date,required:true},
closing_date:{type:Date,required:true},
status:{type:String,enum:["open","closed"],required:true},
hiring_manager:{
    name:{type:String,required:true},
    email:{type:String,required:true,match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']},
    department:{type:String,required:true},
},
recruiters:[recruiter_details],
max_applications:{type:Number},
is_active:{type:Boolean},
allow_multiple_applications:{type:Boolean},
salary_range:{
    min:{type:Number},
    max:{type:Number},
    currency:{type:String},
    is_visible_to_applicants:{type:Boolean}
}

}

);

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
  jobs_schema.pre("save", async function (next) {
    if (!this.isModified("address")) return next(); // Skip if address hasn't changed
  
    const fullAddress = `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country}`;
    const geoData = await geocodeAddress(fullAddress);
  
    if (!geoData) return next(new Error("Invalid address, unable to get location"));
  
    this.latitude = geoData.latitude;
    this.longitude=geoData.longitude;
    
    // MongoDB expects [lng, lat]
    next();
  });

const jobs=mongoose.model('jobs',jobs_schema);

module.exports=jobs;