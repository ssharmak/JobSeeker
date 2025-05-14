const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const { JobCountByCategory,allCity,filterJobs,allDesignations,findJobByDistance,SingleJobByCategory,SingleJobByExamType,SingleJobByInstType,SingleJobBySubject} = require("../controllers/JobController");
const { validateRequest } = require("../middleware/validateRequest");
const { body, query, param } = require("express-validator");
const {authenticateTempToken} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/jobCountByCategory",JobCountByCategory);

router.get("/allCity",allCity);
router.get("/allDesignations",allDesignations);


const filterValidationRules = [
    query("city").optional().trim().escape(),
    query("designation").optional().trim().escape(),
    query("category").optional().trim().escape(),
];

router.get("/filterJobs",validateRequest(filterValidationRules), filterJobs);
router.get("/jobByDistance",authenticateTempToken,findJobByDistance);
router.get("/singleJobByCategory",SingleJobByCategory);
router.get("singleJobByExamType",SingleJobByExamType);
router.get("/singleJobBySubject",SingleJobBySubject);
router.get("/singleJobByInstType",SingleJobByInstType);

module.exports=router;

