const express= require("express");
const router=express();
const { authenticateTempToken } = require("../middleware/authMiddleware");
const{updatePersonnel,updateWorkExperience,updateEducation,updateCertificates,getProfile}=require("../controllers/profile_Controller");


// Routes with authentication middleware
router.put("/update/personnel", authenticateTempToken, updatePersonnel);
router.put("/update/work-experience", authenticateTempToken, updateWorkExperience);
router.put("/update/education", authenticateTempToken, updateEducation);
router.put("/update/certificates", authenticateTempToken, updateCertificates);
router.get("/getProfile",authenticateTempToken,getProfile);

module.exports = router;