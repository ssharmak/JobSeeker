const express=require("express");
const router=express();

//Importing required models
const {singleToken}=require("../middleware/singleTokenMiddleware");
const {applyToJob} =require("../controllers/job_apply_controller");
const {validateRequest}=require("../middleware/validateRequest");
const filterValidationRules = [
    param("job_id").trim().escape(),
    query("job_title").trim().escape(),
    query("cover_letter").optional().trim().escape(),

];

//End point for applying to a job
//frontend has to provide token generated when user logins the system 
router("/:jobId",singleToken,validateRequest(filterValidationRules),applyToJob);






module.exports=router;