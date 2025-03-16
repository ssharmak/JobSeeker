const express = require("express");
const { profileApproval,AppReq,RejRequest } = require("../controllers/adminController");
const { validateRequest } = require("../middleware/validateRequest");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const { body, query, param } = require("express-validator");  

const router = express.Router();
//Admin login

console.log("authMiddleware:", typeof authenticateTempToken);
//Profile which are pending for approval
router.get("/profile_approval",authenticateTempToken,profileApproval); 

//Approve the profile 
router.post("/approve/:id",authenticateTempToken,validateRequest([
    param("id").trim().escape().notEmpty().withMessage("id is required"),
]),AppReq);

//Reject the profile
router.post("/reject/:id",authenticateTempToken,validateRequest([
    param("id").trim().escape().notEmpty().withMessage("id is required"),
]),RejRequest);


module.exports = router;
