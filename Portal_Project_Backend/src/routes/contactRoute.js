const express= require("express");
const { contact } = require("../controllers/contactusController");
const router=express.Router();

router.post('/contact',contact);

module.exports = router;