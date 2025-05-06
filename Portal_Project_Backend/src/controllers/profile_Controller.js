const Candidate = require("../models/candidates");
const Institution = require("../models/Institution");

//To update personnel information in profile

const updatePersonnel= async (req,res)=>{
    try{
const userId=req.user.id;
const {first,last,dob,linkedIn,portFolio,street,city,postal_code,state,country, gender,description,languages}=req.body;
let upDict={};
if(first) upDict["first_name"]=first;
if(last) upDict["last_name"]=last;
if(dob) upDict["date_of_birth"]=dob;
if(linkedIn) upDict["linkedin_profile"]=linkedIn;
if(portFolio) upDict["portfolio_website"]=portFolio;
if(street) upDict["address.street"]=street;
if(city) upDict["address.city"]=city;
if(postal_code) upDict["address.postal_code"]=postal_code;
if(state) upDict["address.state"]=state;
if(country) upDict["address.country"]=country;
if(gender) upDict["gender"]=gender;
if(description) upDict["professional_Description"]=description;
if (languages) {
    upDict["languages"] = Array.isArray(languages)
        ? languages
        : languages.split(','); 
}
const cand=await Candidate.findOne({main_user:userId});
if(!cand){
    console.log("Candidate not found");
    return res.status(401).json({message:"profile not found"});
}
await Candidate.findOneAndUpdate({main_user:userId},{$set:upDict},{new:true});
return res.status(200).json({message:"Profile updated",Candidate:cand.first_name});

    }
    catch(error){
         console.log(error);
    }
}

//To update work experience

const updateWorkExperience = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            job_title,
            organisation,
            position,
            start_date,
            end_date,
            working_till_date,
            employment_type,
            country,
            city,
            responsibilities
        } = req.body;

        const candidate = await Candidate.findOne({ main_user: userId });

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Handle end date if currently working
        const finalEndDate = working_till_date ? null : new Date(end_date);

        const newExperience = {
            job_title,
            organisation,
            position,
            start_date: new Date(start_date),
            end_date: finalEndDate,
            working_till_date,
            employment_type,
            country,
            city,
            responsibilities,
        };

        // Push to work experience array
        candidate.work_experience.push(newExperience);
        await candidate.save();

        res.status(200).json({ message: "Work experience added successfully", work_experience: candidate.work_experience });
    } catch (error) {
        console.error("Error updating work experience:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// To update education details

const updateEducation= async(req,res)=>{
    try{
        const userId=req.user.id;
        const education= req.query;

        const{institution_name, country,city,year_of_passing,board,grading_system,grade,start_date,end_date,course_type,field_of_study}=req.body;

        
        const can= await Candidate.findOne({main_user:userId});

        if (!can) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        const newEd= { education:education,board:board,institution_name:institution_name,start_date:start_date||null,end_date:end_date||null,course_type:course_type,grade:grade,grading_system:grading_system,field_of_study:field_of_study,country:country,city:city,year_of_passing:year_of_passing};
        can.education.push(newEd);
        await can.save();
        res.status(200).json({ message: "Education added successfully", education: can.education })
    }
    catch(error){
        console.error("Error updating education details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// To update certifications

const updateCertificates= async(req,res)=>{
    try{

        const userId=req.user.id;
        const can=await Candidate.findOne({main_user:userId});
        if (!can) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        const {name,issuer,issue_date,certificate_url}=req.body;

        const newCert= {name,issuer,issue_date,certificate_url};
        can.certifications.push(newCert);
        await can.save();

        res.status(200).json({ message: "Certification added successfully", certification: can.certifications });



    }
    catch(error){
        console.error("Error updating certification details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getInstProfile= async(req,res)=>{
    try{
        const inst_id=req.user.id;
        if(!inst_id){
            return res.status(401).json({message:"institute id not provided"});
        }

        const inst = await Institution.findById(inst_id).select("-password -__v");

        if (!inst) {
            return res.status(404).json({ message: "Institute not found" });
        };
         return res.status(200).json({Institute:inst});

    }
    catch(error){
        console.error("Error fetching institution profile:", error);
    return res.status(400).json({ message: error.message || "Error occurred" });

    }
}

module.exports={updatePersonnel,updateWorkExperience,updateEducation,updateCertificates,getInstProfile};