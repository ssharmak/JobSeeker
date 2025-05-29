const Candidate=require("../models/candidates");
const JobApplication=require("../models/Jobs_Apply");
const Jobs=require("../models/job");
const Institution = require("../models/Institution");
const sendEmail = require("../utils/sendEmail");

const applyToJob = async (req, res) => {
  try {
    const { job_title, cover } = req.body;
    const job_id = req.params.jobId;
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(400).json({ message: "User not found" });
    }

    const cand = await Candidate.findOne({ main_user: user_id });
    if (!cand) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    const job = await Jobs.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const institutionId = job.Institution_id;

    const alreadyApplied = await JobApplication.findOne({
      candidate_id: cand._id,
      job_id: job_id,
    });

    if (alreadyApplied) {
      return res.status(409).json({ message: "Already applied to this job." });
    }

    const newJobApplication = new JobApplication({
      candidate_id: cand._id,
      job_id: job_id,
      institutionId: institutionId,
      status: "Applied",
      cover_letter: cover,
      seenByInstitution: false,
    });

    await newJobApplication.save();

    cand.applications.push({
      job_id: job_id,
      job_title: job_title,
      status: "Applied",
    });

    await cand.save();

    // Fetch institution email and send application notification
    const institution = await Institution.findById(institutionId);
    const institutionEmail = institution?.email;

    if (institutionEmail) {
      const candidateName = `${cand.first_name} ${cand.last_name}`;
      const resumeLink = cand.resume; 

      await sendEmail(
        institutionEmail,
        `New Job Application: ${job_title}`,
        `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Application Received</h2>
            <p><strong>${candidateName}</strong> has applied for the job position: <strong>${job_title}</strong>.</p>
            <h3>Cover Letter:</h3>
            <p>${cover}</p>
            ${
              resumeLink
                ? `<p><a href="${resumeLink}" style="display:inline-block; margin-top:10px; padding:10px 15px; background-color:#007bff; color:white; text-decoration:none; border-radius:4px;" target="_blank">Download Resume</a></p>`
                : "<p><em>No resume provided.</em></p>"
            }
            <p style="margin-top: 20px;">Regards,<br>Teachersearch.in</p>
          </div>
        `
      );
    }

    res.status(200).json({
      message: `Successfully applied for the job: ${job_title}`,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


//Display all jobs particular user applied
const allAppliedJobs= async (req,res)=>
{
      try {
          // Get the user ID from the authenticated request
          const user_id = req.user.id; 
  
          
          if (!user_id) {
              return res.status(400).json({ message: "User not found" });
          }
  
          
          const candidate = await Candidate.findOne({ Main_user: user_id });
  
          // If candidate is not found, return error
          if (!candidate) {
              return res.status(404).json({ message: "Candidate not found" });
          }
  
      const allJobs= candidate.applications.map(app =>({
          job_id:app.job_id,
          job_title:app.job_title,
          status:app.status,
          applied_date:app.applied_date

      }));

      res.status(200).json(allJobs);

  }
    catch(error){
        res.status(400).json({message:"Internal Server Error"});
        console.log("error",error);

    }
}

module.exports={applyToJob, allAppliedJobs};