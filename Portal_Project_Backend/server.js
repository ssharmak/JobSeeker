const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
  origin: "https://teachersearch.in", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Optional logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Origin:", req.headers.origin || "None");
  next();
});

// Routes imports
const authRoute = require("./src/routes/authRoutes");
const adminRoute = require("./src/routes/admin_routes");
const userRoute = require("./src/routes/user_routes");
const jobApplyRoutes = require("./src/routes/job_apply_routes");
const bulkCandidateRoutes = require("./src/routes/bulkCandidateRoute");
const bulkRequirementRoutes = require("./src/routes/bulkRequirementRoute");
const profileRoutes = require("./src/routes/profile_Routes");
const miscellaneousRoutes = require("./src/routes/miscellanious_routes");
const institutionRoutes = require("./src/routes/institution_routes");
const searchCandidatesRoutes = require("./src/routes/searchcandidateRoute");
const contactRoutes = require('./src/routes/contactRoute');
const jobPostListRoutes = require("./src/routes/jobpostlistRoute");
const notificationRoutes = require("./src/routes/notificationRouter");
const creditRoutes = require("./src/routes/credit_routers");

// Use routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/job/apply", jobApplyRoutes);
app.use("/api/bulkcandidate", bulkCandidateRoutes);
app.use("/api/bulkRequirement", bulkRequirementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mis", miscellaneousRoutes);
app.use("/api/searchcandidate", searchCandidatesRoutes);
app.use("/api/institutionfilter", institutionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/jobs", jobPostListRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/credits",creditRoutes);

// Serve resume files statically
//app.use("/uploads/resumes", express.static(path.join(__dirname, "uploads/resumes")));

// Fallback for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
