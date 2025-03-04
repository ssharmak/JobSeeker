const express = require("express");
const { loginAdmin,profileApproval,AppReq } = require("../controllers/adminController");  // ✅ Fix Import

const router = express.Router();

router.post("/admin/login", loginAdmin); 
router.get("/profile_approval",profileApproval); 
router.post("/approve",AppReq);


module.exports = router;
