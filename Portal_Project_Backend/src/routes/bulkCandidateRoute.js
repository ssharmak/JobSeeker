const express= require("express");
const router = express.Router();
const multer = require('multer');
const { fileUpload, createCandidate } = require("../controllers/bulkCandidateController");
const { authenticateTempToken } = require("../middleware/authMiddleware");
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-excel', upload.single('file'),authenticateTempToken, fileUpload);


module.exports = router;