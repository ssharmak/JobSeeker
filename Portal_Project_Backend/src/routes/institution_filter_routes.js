const express= require("express");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const { findCandidates,addJob}= require("../controllers/InstitutionFilter_Controller")

const router=express();

router.post("/addNewJob",authenticateTempToken,addJob)
router.post("/findNearByCandidates",authenticateTempToken,findCandidates);