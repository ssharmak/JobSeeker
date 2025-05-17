const express=require("express");
const router=express.Router();
const {termss,createTerm,abUs,createinfo,createHelp,Helpp}=require("../controllers/miscellanious_controller");

router.get("/terms",termss);
router.post("/addTerm",createTerm);
router.get("/aboutUs",abUs);
router.post("/aboutUs",createinfo);
router.post("/help",createHelp);
router.get("/help",Helpp);


module.exports=router;