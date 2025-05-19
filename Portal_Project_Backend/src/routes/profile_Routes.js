const express= require("express");
const router=express();
const { authenticateTempToken } = require("../middleware/authMiddleware");
const{updatePersonnel,updateWorkExperience,updateEducation,updateCertificates,getInstProfile,getCandProfile}=require("../controllers/profile_Controller");
const upload=require("../utils/upload");


// Routes with authentication middleware
router.put("/update/personnel",upload.single("resume"), authenticateTempToken, updatePersonnel);
router.put("/update/work-experience", authenticateTempToken, updateWorkExperience);
router.put("/update/education", authenticateTempToken, updateEducation);
router.put("/update/certificates", authenticateTempToken, updateCertificates);
// router.put("/update/resume",authenticateTempToken,updateResume);
router.get("/getInstProfile",authenticateTempToken,getInstProfile);
router.get("/getCandprofile",authenticateTempToken,getCandProfile);


module.exports = router;