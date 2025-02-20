const express= require("express");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const {registerUser,loginUser, verifyOtp,setPassword} = require("../controllers/authController");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const {
    registerInstitution,
    verifyOtpInstitution,
    setPasswordInstitution,lo
  } = require("../controllers/institutionController");





const router=express.Router();


// routes

// Register and login routes
router.post("/register-user",registerUser);
router.post("/login-user",loginUser);
router.post("/verify",verifyOtp);
router.post("/set-password", setPassword);


router.post("/register-inst", registerInstitution);

// OTP Verification: Provide OTP (otp1) to verify institution
router.post("/verify-otp-inst", verifyOtpInstitution);

// Set Password: Only password is required; institution email comes from token
router.post("/password-inst", authenticateTempToken, setPasswordInstitution);



module.exports=router;
