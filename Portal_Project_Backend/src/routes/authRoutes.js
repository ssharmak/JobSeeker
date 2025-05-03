const express= require("express");

const {loginUser, verifyOtp,setPassword, registerUser,logoutUser} = require("../controllers/authController");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const {
    registerInstitution,
    verifyOtpInstitution,
    setPasswordInstitution,loginInstitution,resendOtp
  } = require("../controllers/institutionController");
const { singleToken } = require("../middleware/singleTokenMiddleware");
const upload=require("../utils/upload");



const router=express.Router();



// routes

// Register routes for user
router.post("/register-user",upload.single("resume"),registerUser);
router.post("/login-user",loginUser);
router.post("/verify",verifyOtp);
router.post("/set-password",singleToken,setPassword);
router.post("/logoutUser",authenticateTempToken,logoutUser);
//register routes for institutions
router.post("/register-inst", registerInstitution);

// // OTP Verification: Provide OTP (otp1) to verify institution
router.post("/verify-otp-inst", verifyOtpInstitution);

//resend otp
router.post("/resend-otp", resendOtp);

// // Set Password: Only password is required; institution email comes from token
router.post("/password-inst", singleToken, setPasswordInstitution);

router.post("/login-inst",loginInstitution)

//login route for user and admin [Specify role="admin while inserting admin record in database"]
router.post("/login-user",loginUser);


module.exports=router;
