const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const redisClient = redis.createClient();
const cors = require("cors"); // Add this line
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/authRoutes");
const adminRoute = require("./src/routes/admin_routes");
const userRoute = require("./src/routes/user_routes");
const job_apply_routes = require("./src/routes/job_apply_routes");
const bulkCandidaterouter = require("./src/routes/bulkCandidateRoute");
const bulkRequirementrouter = require("./src/routes/bulkRequirementRoute");
const profileRoutes=require("./src/routes/profile_Routes");
const miscelleniousRoutes=require("./src/routes/miscellanious_routes");
const institutionRoutes=require("./src/routes/institution_routes");
const searchCandidatesRoutes = require("./src/routes/searchcandidateRoute");
const contactRoutes = require('./src/routes/contactRoute');
const jobpostlistRoutes = require("./src/routes/jobpostlistRoute");


dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

// CORS Middleware: Allow requests from https://teachersearch.in
// app.use(cors({
//     origin:  "https://teachersearch.in", // Default to production if no env var
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// }));

// CORS Middleware: Allow requests from http://localhost:3000
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
}));

app.get('/', (req, res) => {
    res.send('Teacher api running new deploy');
});

// Middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/job/apply", job_apply_routes);
app.use("/api/bulkcandidate", bulkCandidaterouter);
app.use("/api/bulkRequirement", bulkRequirementrouter);
app.use("/api/profile",profileRoutes);
app.use("/api/mis",miscelleniousRoutes);
app.use("/api/searchcandidate/",searchCandidatesRoutes);
app.use("/api/institutionfilter",institutionRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/jobs",jobpostlistRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
