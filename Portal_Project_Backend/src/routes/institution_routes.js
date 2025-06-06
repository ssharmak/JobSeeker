const express= require("express");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const { filterCandidates, findCandidatesByDistance, getInstitute}= require("../controllers/InstitutionFilter_Controller");
const { addJob }=require("../controllers/institutionController");

const router=express.Router();

router.post("/addNewJob",authenticateTempToken,addJob)
router.post("/findNearByCandidates",authenticateTempToken,findCandidatesByDistance);
router.get("/filterCandidates",filterCandidates);
router.get("/getInstitute",getInstitute);

module.exports=router;