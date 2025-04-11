const express= require("express");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const { filterCandidates,addJob, findCandidatesByDistance}= require("../controllers/InstitutionFilter_Controller")

const router=express();

router.post("/addNewJob",authenticateTempToken,addJob)
router.post("/findNearByCandidates",authenticateTempToken,findCandidatesByDistance);
router.get("/filterCandidates",filterCandidates);