const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const { JobFilter,jobByCity} = require("../controllers/JobController");

const router = express.Router();

router.get("/jobCountByCategory",JobFilter);
router.get("/jobByCity",jobByCity);
router.get("/jobByCity",jobByCity);