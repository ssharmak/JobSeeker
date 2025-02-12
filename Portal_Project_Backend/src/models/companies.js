const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    size: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
    founded_year: { 
        type: Number, 
        min: 1800, 
        max: new Date().getFullYear(), 
        required: true 
    },
    headquarters: { type: String, required: true },
    website: { 
        type: String, 
        required: true,
        validate: [validator.isURL, 'Invalid website URL'] 
    },
    about: { type: String, required: true },
    locations: { type: [String], required: true },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    recruiters: [{ 
        name: { type: String, required: true }, 
        email: { 
            type: String, 
            required: true, 
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Invalid email format'
            ]
        }
    }],
    benefits: { type: [String], required: true },
    rating: { type: Number, min: 1, max: 5 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
