const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const { JobCountByCategory,allCity,filterJobs,allDesignations} = require("../controllers/JobController");
const { validateRequest } = require("../middleware/validateRequest");
const { body, query, param } = require("express-validator");

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

module.exports=router;

