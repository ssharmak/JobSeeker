const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    added_by: { type: String, required: true },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now } 
});

const jobApplicationSchema = new mongoose.Schema({
    candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    application_date: { type: Date, required: true, default: Date.now },
    status: { 
        type: String, 
        enum: ["Applied", "In Review", "Interview Scheduled", "Offered", "Rejected"], 
        required: true 
    },
    cover_letter: { type: String },
    notes: { type: [notesSchema], default: [] } 
});

jobApplicationSchema.index({candidate_id:1,job_id:1},{unique:true});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
