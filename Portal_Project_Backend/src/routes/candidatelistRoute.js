const express= require("express");
const { candidateprofileList } = require("../controllers/candidatelistController");
const router = express.Router();

router.route('/candidatelist').get(candidateprofileList);


module.exports = router;