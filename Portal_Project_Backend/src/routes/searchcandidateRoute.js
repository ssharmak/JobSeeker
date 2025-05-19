const express= require("express");
const { searchCandidates } = require("../controllers/searchCandidateController");
const router=express.Router();


router.post('/search-Candidate',searchCandidates);

module.exports = router;