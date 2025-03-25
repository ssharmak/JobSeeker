const express= require("express");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const { findCandidates}= require("../controllers/InstitutionFilter_Controller")

const router=express();


router.post("/findNearByCandidates",authenticateTempToken,findCandidates)