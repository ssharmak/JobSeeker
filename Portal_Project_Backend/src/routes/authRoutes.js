const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const {registerAdmin,loginAdmin} = require("../controllers/authController")





const router=express.Router();


// routes

// Register and login routes
router.post("/register-admin",registerAdmin);
router.post("/login-admin",loginAdmin);

module.exports=router;
