const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("../Portal_Project_Backend/src/config/db")
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const authRoute = require("./src/routes/authRoutes");
const adminRoute = require("./src/routes/admin_routes");
const userRoute = require("./src/routes/user_routes");

dotenv.config();
connectDB();

const app= express()

//Middleware 

app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);
app.use("/api/user",userRoute);

const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))