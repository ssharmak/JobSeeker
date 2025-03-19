const mongoose = require('mongoose');
const validator = require('validator');
const { getNames } = require('country-list');

const validCountries = getNames();

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    field_of_study: { type: String, required: true },
    university: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    grade: { type: String }
});

const workExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    responsibilities: { type: [String], required: true },
    technologies_used: { type: [String] }
});

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issue_date: { type: Date, required: true },
    certificate_url: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value),
            message: "Invalid URL"
        }
    }
});

const resumeSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isURL(value),
            message: "Invalid URL"
        }
    },
    uploaded_at: { type: Date, required: true }
});

const applicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    job_title: { type: String, required: true },
    applied_date: { type: Date, required: true,default:Date.now() },
    Status: { type: String, required: true },
    recruiter_comments: { type: String }
});

const candidateSchema = new mongoose.Schema({
    main_user:{type:mongoose.Schema.Types.ObjectId, ref:'Users',required:true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{6,14}$/, "Invalid phone number format"]
    },
    date_of_birth: { type: Date, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postal_code: { type: String },
        country: {
            type: String,
            required: true,
            enum: validCountries
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
    resume: resumeSchema,
    applications: [applicationSchema],
    status: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    phone_verified: { type: Boolean, required: true },
    admin_verified:{type:Boolean,required:true}
   
},{ timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);


module.exports = {Candidate};
