const express= require("express");

const {registerUser,loginUser, verifyOtp,setPassword} = require("../controllers/authController");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const {
    registerInstitution,
    verifyOtpInstitution,
    setPasswordInstitution,loginInstitution
  } = require("../controllers/institutionController");
const { singleToken } = require("../middleware/singleTokenMiddleware");





const router=express.Router();


// routes

// Register routes for user
router.post("/register-user",registerUser);
router.post("/login-user",loginUser);
router.post("/verify",verifyOtp);
router.post("/set-password",singleToken,setPassword);

//register routes for institution
router.post("/register-inst", registerInstitution);

// // OTP Verification: Provide OTP (otp1) to verify institution
router.post("/verify-otp-inst", verifyOtpInstitution);

// // Set Password: Only password is required; institution email comes from token
router.post("/password-inst", singleToken, setPasswordInstitution);

router.post("/login-inst",loginInstitution)

//login route for user and admin [Specify role="admin while inserting admin record in database"]
router.post("/login-user",loginUser);


module.exports=router;
