const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")

dotenv.config();
connectDB();

const app= express()

//Middleware 

app.use(express.json())
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/admin",require("./src/routes/admin_routes"));

const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))