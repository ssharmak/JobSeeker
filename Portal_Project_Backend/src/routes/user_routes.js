const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const { JobCountByCategory,jobByCity,jobByCategoryName,allCity,llDesignations,jobByDesignation} = require("../controllers/JobController");
const { validateRequest } = require("../middleware/validateRequest");
const { body, query, param } = require("express-validator");

const router = express.Router();

router.get("/jobCountByCategory",JobCountByCategory);
router.get("filter/jobByCity",validateRequest([
    query("city_name").trim().escape().notEmpty().withMessage("City name is required"),
]),jobByCity);
router.get("filter/jobByCategoryName",validateRequest([
    query("category_name").trim().escape().notEmpty().withMessage("category_name  is required"),
]),jobByCategoryName);
router.get("/allCity",allCity);
router.get("/allDesignations",llDesignations);
router.get("filter/jobByDesignation",validateRequest([
    query("des_name").trim().escape().notEmpty().withMessage("Designation name is required")
]),jobByDesignation);

const filterValidationRules = [
    query("city").optional().trim().escape(),
    query("designation").optional().trim().escape(),
    query("category").optional().trim().escape(),
];

router.get("/filterJobs",validateRequest(filterValidationRules), filterJobs);

