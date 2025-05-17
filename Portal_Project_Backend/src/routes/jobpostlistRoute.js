const express= require("express");
const { jobpostList, jobslistcount } = require("../controllers/joblistController");
const { jobsearch } = require("../controllers/JobController");
const router = express.Router();

router.route('/jobpostlist').get(jobpostList);
router.route('/jobslistcount').get(jobslistcount);
router.route('/search-jobs').get(jobsearch);


module.exports = router;