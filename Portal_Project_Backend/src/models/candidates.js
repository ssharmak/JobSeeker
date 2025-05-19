const mongoose = require('mongoose');
const validator = require('validator');
const { getNames } = require('country-list');
const axios = require("axios");

const validCountries = getNames();

const educationSchema = new mongoose.Schema({
    education: { type: String, required: true },
    board:{type:String},
    field_of_study: { type: String},
    institution_name: { type: String},
    start_date: { type: Date},
    end_date: { type: Date},
    grade: { type: String },
    grading_system:{type:String},
    country:{type:String},
    city:{type:String},
    year_of_passing:{type:String},
    course_type:{type:String}

});

const workExperienceSchema = new mongoose.Schema({
    job_title:{type:String,required:true},
    organisation: { type: String, required: true },
    position: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date,required:false },
    working_till_date:{type:Boolean},
    employment_type:{type:String,required:true},
    country:{type:String,required:true},
    city:{type:String,required:true},
    responsibilities: { type: [String] },
    
});

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issue_date: { type: Date, required: true },
    certificate_url: {
        type: String
        // validate: {
        //     validator: (value) => validator.isURL(value),
        //     message: "Invalid URL"
        // }
    }
});

// // const resumeSchema = new mongoose.Schema({
// //     file_name: { type: String },
// //     file_url: {
// //         type: String
// //         // required: true,
// //         // validate: {
// //         //     validator: (value) => validator.isURL(value),
// //         //     message: "Invalid URL"
// //         // }
// //     },
//     uploaded_at: { type: Date, required: true }
// });

const applicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    job_title: { type: String, required: true },
    applied_date: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true },
    recruiter_comments: { type: String }
});

const candidateSchema = new mongoose.Schema({
    main_user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    first_name: { type: String, required: true },
    last_name: { type: String},
    gender:{type: String},
    languages:{type:[String]},
    professional_Description:{ type: String},
    email: {
        type: String,
        unique: true,
        required: true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: "Invalid email address"
        // }
    },
    phone: {
        type: String,
        //match: [/^\+?[1-9]\d{6,14}$/, "Invalid phone number format"]
    },
    date_of_birth: { type: Date },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postal_code: { type: String },
        country: {
            type: String,
            
            // enum: validCountries
        }
    },
    linkedin_profile: {
        type: String,
        validate: {
            validator: (value) => value === "" || validator.isURL(value),
            message: "Invalid URL"
        }
    },
    portfolio_website: {
        type: String,
        validate: {
            validator: (value) => value === "" || validator.isURL(value),
            message: "Invalid URL"
        }
    },
    education: [educationSchema],
    work_experience: [workExperienceSchema],
    skills: { type: [String] },
    certifications: [certificationSchema],
    resume:{type:String},
    applications: [applicationSchema],
    status: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    phone_verified: { type: Boolean, required: true },
    admin_verified: { type: Boolean, required: true },
    latitude: { type: Number },
    longitude: { type: Number }
}, { timestamps: true });

// Function to get coordinates using OpenStreetMap
async function getCoordinates(address) {
    const formattedAddress = `${address.street}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formattedAddress)}`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            return { lat: parseFloat(response.data[0].lat), lon: parseFloat(response.data[0].lon) };
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return { lat: null, lon: null };
    }
}

// Pre-save hook to fetch coordinates before saving
candidateSchema.pre("save", async function (next) {
    if (this.address && this.address.city) {
        const { lat, lon } = await getCoordinates(this.address);
        if (lat !== null && lon !== null) {
            this.latitude = lat;
            this.longitude = lon;
        }
    }
    next();
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports =  Candidate;
