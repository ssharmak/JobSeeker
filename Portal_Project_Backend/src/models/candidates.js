const mongoose = require('mongoose');
const validator = require('validator');
const { getNames } = require('country-list');

const validCountries = getNames();

const educationSchema = new mongoose.Schema({
    degree: { type: String },
    field_of_study: { type: String},
    university: { type: String},
    start_date: { type: Date},
    end_date: { type: Date},
    grade: { type: String }
});

const workExperienceSchema = new mongoose.Schema({
    company: { type: String  },
    position: { type: String },
    start_date: { type: Date},
    end_date: { type: Date },
    responsibilities: { type: [String]},
    technologies_used: { type: [String] }
});

const certificationSchema = new mongoose.Schema({
    name: { type: [String] },
    issuer: { type: String},
    issue_date: { type: Date},
    certificate_url: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value),
            message: "Invalid URL"
        }
    }
});

const resumeSchema = new mongoose.Schema({
    file_name: { type: String},
    file_url: {
        type: String,
        // validate: {
        //     validator: (value) => validator.isURL(value),
        //     message: "Invalid URL"
        // }
    },
    uploaded_at: { type: Date,}
});

const applicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
    job_title: { type: String },
    applied_date: { type: Date,default:Date.now() },
    Status: { type: String,},
    recruiter_comments: { type: String }
});

const candidateSchema = new mongoose.Schema({
    main_user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
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
    resume: resumeSchema,
    applications: [applicationSchema],
    status: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    phone_verified: { type: Boolean, required: true },
    admin_verified: { type: Boolean, required: true },
    approval: { type: Number, default: 0 },  // Default is 0
    reject: { type: Number, default: 0 },    // Default is 0
    flag : {type:Number,default:0} //Default is 0 for soft delete if 1 means delete
}, { timestamps: true });


const Candidate = mongoose.model('Candidate', candidateSchema);


module.exports = {Candidate};
