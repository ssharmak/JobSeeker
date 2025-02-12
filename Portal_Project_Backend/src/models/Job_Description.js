const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    preferred_qualifications: { type: [String] },
    responsibilities: { type: [String], required: true },
    benefits: { type: [String] }
}, { timestamps: true });

const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema);

module.exports = JobDescription;
