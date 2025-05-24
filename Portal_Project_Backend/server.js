const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();
app.set("trust proxy", 1); // Trust reverse proxies (e.g. Nginx)

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://teachersearch.in", // Allow frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support for all routes

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json()); // Parse incoming JSON

// ✅ Optional Logging Middleware (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Origin:", req.headers.origin || "None");
  console.log("User-Agent:", req.headers['user-agent'] || "None");
  console.log("Referer:", req.headers.referer || "None");
  next();
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Teacher API is running");
});

// Import routes
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

// ✅ Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
