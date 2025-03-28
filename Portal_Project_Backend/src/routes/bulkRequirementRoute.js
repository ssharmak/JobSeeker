const express= require("express");
const router = express.Router();
const multer = require('multer');
const { RequirementUpload } = require("../controllers/bulkRequirementController");

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-jobexcel', upload.single('file'), RequirementUpload);


module.exports = router;