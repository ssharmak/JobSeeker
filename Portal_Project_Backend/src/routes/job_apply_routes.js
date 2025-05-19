const express=require("express");
const router=express.Router();

//Importing required models
const {singleToken}=require("../middleware/singleTokenMiddleware");
const {applyToJob,allAppliedJobs} =require("../controllers/job_apply_controller");
const {validateRequest}=require("../middleware/validateRequest");
const {authenticateTempToken}=require("../middleware/authMiddleware"); 
const { body, query, param } = require("express-validator");
const filterValidationRules = [
    param("job_id").trim().escape(),
    query("job_title").trim().escape(),
    query("cover_letter").optional().trim().escape()];

//End point for applying to a job
//frontend has to provide token generated when user logins the system .....as of now single Token is used 
router.post("/:jobId",singleToken,validateRequest(filterValidationRules),applyToJob);
router.get("/allAppliedJobs",singleToken,allAppliedJobs);

module.exports=router;