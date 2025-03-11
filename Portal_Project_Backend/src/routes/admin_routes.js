const express = require("express");
const { loginAdmin,profileApproval,AppReq,RejRequest } = require("../controllers/adminController");
const { validateRequest } = require("../middleware/validateRequest");
const { authMiddleware} = require("../middleware/authMiddleware");
const { body, query, param } = require("express-validator");  

const router = express.Router();
//Admin login
router.post("/admin/login",validateRequest([
    body("email").trim().escape().notEmpty().withMessage("id is required"),body("password").trim().escape().notEmpty().withMessage("password is required"),
]), loginAdmin); 

//Profile which are pending for approval
router.get("/profile_approval",authMiddleware,profileApproval); 

//Approve the profile 
router.post("/approve/:id",authMiddleware,validateRequest([
    param("id").trim().escape().notEmpty().withMessage("id is required"),
]),AppReq);

//Reject the profile
router.post("/reject/:id",authMiddleware,validateRequest([
    param("id").trim().escape().notEmpty().withMessage("id is required"),
]),RejRequest);


module.exports = router;
