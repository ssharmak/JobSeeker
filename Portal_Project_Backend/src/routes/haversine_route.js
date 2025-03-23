const express= require("express");
const {DistCount}=require("../controllers/Haversine_Controller");

const router=express.Router();

router.post("/calculate-distance",DistCount);



module.exports=router;