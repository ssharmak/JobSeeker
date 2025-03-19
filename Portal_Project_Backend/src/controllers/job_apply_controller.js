const Candidate=require("../models/candidates");
const JobApplication=require("../models/Jobs_Apply");
const jobs=require("../models/job");
const cand_application=require("../models/cand_application")


const applyToJob= async (req,res)=> {
    try{
    const {job_title,cover}= req.query;
    const job_id=req.param;
    const user_id=req.user.id;
    if (!user_id){
        console.log("user id is not fetched");
        return res.status(400).json({message:"user not found"});

    };

const cand= await Candidate.findOne({main_user:user_id});
if (!cand){
    return res.status(400).json({message:"candidate not found"});
};
    cand_id=cand.id;

    //Update in JobApplication Database
    
    const newJobApplication= new JobApplication({candidate_id:cand_id,job_id:job_id,status:"Applied",cover_letter:cover});
    await newJobApplication.save();
 
   // Update in candidate database 
   
   cand.applications.push({job_id:job_id,job_title:job_title,Status:"Applied"});
   await cand.save();
   res.status(200).json({message:`Successfully applied for a job : ${job_title}`});

}

   catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error.message });


   }


}

module.exports={applyToJob};