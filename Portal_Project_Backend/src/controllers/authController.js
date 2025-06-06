const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const User= require("../models/Users");
const otp=require("../models/otp");
const sendEmail= require("../utils/sendEmail");
const crypto= require('crypto');
const Candidate =require("../models/candidates");
const multer = require("multer");
const redis=require("redis");
const { appendFile } = require("fs");
const { render } = require("../routes/profile_Routes");
const redisClient = redis.createClient();


  // const registerUser = async (req, res) => {
  //   const { username, country, mobile_number, email, role } = req.body;
  
  //   try {
  //     // Check if a user with the provided email already exists
  //     let user = await User.findOne({ email });
  //     if (user && user.is_verified) {
  //       return res.status(400).json({ message: "User already exists" });
  //     }
  
  //     // If user exists but is not verified, update details
  //     if (user && !user.is_verified) {
  //       user.username = username;
  //       user.country = country;
  //       user.mobile_number = mobile_number;
  //       user.role=role;
  //       await user.save();
  //     } else if (!user) {
  //       // Create a new user record (without password)
  //       user = new User({ username, country, mobile_number, email,role });
  //       await user.save();
  //     }
  
  //     // Check if OTP was already sent and is still valid
  //     const existingOtp = await otp.findOne({ email });
  //     if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_Expiry * 1000) {
  //       const timeLeft = process.env.OTP_Expiry - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
  //       return res.status(400).json({
  //         message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
  //       });
  //     }
  
  //     // Generate a 6-digit OTP
  //     const otpCode = crypto.randomInt(100000, 999999).toString();
  //     await otp.create({ email, otp: otpCode });
  
  //     // Send OTP to user email
  //     await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);
  
  //     res.status(200).json({ message: "OTP sent successfully" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };
  
  
  
  
  
  // Register User Function
  const registerUser = async (req, res) => {
    try {
      const { name, phone_number, email } = req.body;
      const resume = req.file ? req.file.path : null;
  
      if (!name || !phone_number || !email) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      let user = await User.findOne({ email });
  
      if (user && user.is_verified) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      if (user && !user.is_verified) {
        user.name = name;
        user.phone_number = phone_number;
        if (resume) user.resume = resume;
        await user.save();
      } else if (!user) {
        user = new User({ name, phone_number, email, resume });
        await user.save();
      }
  
      // Check if OTP was already sent and valid
      const existingOtp = await otp.findOne({ email });
      if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_EXPIRY * 1000) {
        const timeLeft = process.env.OTP_EXPIRY - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
        return res.status(400).json({
          message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
        });
      }
  
      // Generate OTP
      const otpCode = crypto.randomInt(100000, 999999).toString();
      await otp.create({ email, otp: otpCode });
  
      // Send Email
     await sendEmail(
      email,
      "Verify Your Email - Teachersearch.in",
      `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thank you for registering with <strong>Teachersearch.in</strong>!</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h3 style="color: #2c3e50;">${otpCode}</h3>
        <p>Please enter this code within the next 10 minutes to complete your registration.</p>
        <p style="font-size: 0.9em; color: #666;">If you didn’t initiate this request, please ignore this message.</p>
        <p>– Team Teachersearch.in</p>
      </div>
      `
    );

      res.status(200).json({ message: "OTP sent successfully" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
  

const verifyOtp = async (req, res) => {
    try {
      const { otp1 } = req.body; // OTP provided by the user
  
      // Find the OTP record
      const otpRecord = await otp.findOne({ otp: otp1 });
      if (!otpRecord) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // Retrieve email from OTP record
      const userEmail = otpRecord.email;
  
      // Find the user by email
      const existingUser = await User.findOne({ email: userEmail });
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      if (existingUser.is_verified) {
        return res.status(400).json({ message: "User already verified" });
      }
  
      // Mark the user as verified
      existingUser.otp_verified = true;
      await existingUser.save();
  
      // Delete OTP record after verification
      await otp.deleteOne({ email: userEmail });
  
      // Create a temporary JWT token for password setup
      const tempToken = jwt.sign(
        { email: userEmail }, 
        process.env.JWT_SECRET, 
        { expiresIn: "10m" } // Token valid for 10 minutes (only for password setup)
      );
  
      return res.status(200).json({
        message: "OTP verified successfully. Proceed to set password.",
        token: tempToken,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };
  


  const setPassword = async (req, res) => {
    try {
      const { password } = req.body; // Only password is taken as input
  
      // Retrieve email from the authenticated session (or request object)
      const userEmail = req.user.email; // Ensure email is stored in req.user after OTP verification
  
      if (!userEmail) {
        return res.status(400).json({ message: "User email not found in session" });
      }
  
      // Find the verified user by email
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      if (!user.otp_verified) {
        return res.status(400).json({ message: "User is not verified yet" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password field
      user.password = hashedPassword;
      

    if (user.role === "user") {
      const newCandidate = {
        main_user: user._id,
        first_name: user.name,
        last_name: "",
        email: user.email,
        phone: user.phone_number,
        date_of_birth: null,
        address: {
          street: "",
          city: "",
          state: "",
          postal_code: "",
          country: ""
        },
        linkedin_profile: "",
        portfolio_website: "",
        education: [],
        work_experience: [],
        skills: [],
        certifications: [],
        resume: user.resume,
        applications: [],
        status: "pending",
        email_verified: true,
        phone_verified: false,
        admin_verified: false
      };
      const newCandidateData = new Candidate(newCandidate);

      await newCandidateData.save();
      user.is_verified=true;
      await user.save();

      }
  
      // Optionally, generate a JWT token upon successful password setup
    
      res.status(200).json({
        message: "Password set successfully. Registration complete.",
    
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  

// exports.loginUser= async(req,res) =>{
//     const {email,password} = req.body;

//     try{
//         let user=await User.findOne({email});
//         if(!user) return res.status(400).json({message:"User does not exist please register"}); 

//         const isMatch= await bcrypt.compare(password,user.password);
//         if(!isMatch) return res.status(400).json({message:"Wrong Password"});

//         if(!user.is_verified) return res.status(500).json({ message: "user not verified..Please verify your email" });
        
        
//         //JWT Token Generation
//         const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});
//         const refToken= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_REFRESH);
         
//         res.json({token:token,refreshToken: refToken,message: "Login successful"});

//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// };

// Login Route (Single for All Roles)
const loginUser=async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email }); 

      if (!user) {
          return res.status(400).json({ message: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credentials!" });
      }

      
      const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
      const refToken= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_REFRESH,{expiresIn:"7d"});

      //Storing the refresh Token in cookies to use it later
      res.cookie("refreshToken", refToken, {
        httpOnly: true,
        secure: true, // Set to true in production (for HTTPS)
        sameSite: "Strict",
      });

     //We can change the url paths when they finalised  
      if (user.role === 'admin') {
          return res.json({message: `AccessToken: ${token} and refreshToken: ${refToken}`});
      } else {
          return res.json({message: `AccessToken: ${token} and refreshToken: ${refToken}`});
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
  }
};

const logoutUser= async(req,res)=>{
  try{
  const refToken= req.cookies.refreshToken;

  if(!refToken){
    return res.sendStatus(204);
  }

  //Blacklist the refresh token in Redis (expires after 7 days)
  jwt.verify(refToken,process.env.JWT_SECRET_REFRESH,(err,decoded)=>{
    if(!err){
      redisClient.setEx(refToken,7*24*60*60,"Blacklisted");
    }
  });
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:true,
    sameSite:"Strict",
  });
  res.json({message:"Logged out successfully"});
   
  }
  catch(error){

  }

};

const forgotPassword=async(req,res)=>{
  try{
  const {email}= req.body;

  if(!email){
    return res.status(400).json({message:"Email is required"});
  };
  const verifiedUser=await User.findOne({email:email});
  if(!verifiedUser ||!verifiedUser.is_verified){
    return res.status(404).json({message:"User is not found or not verified"});
  };
  const ptoken=crypto.randomInt(100000, 999999).toString();
  verifiedUser.ptoken=ptoken;
  await verifiedUser.save();
  const url=`https://teachersearch.in/reset-password?token=${ptoken}`

  await sendEmail(
      email,"Password reset link",`Your password resetting link is here:${url}`
      
      
    );
    res.status(200).json({message:"Email sent"});

}
catch(error){
  console.error("Forgot password error:", error);
  return res.status(500).json({ message: "Internal Server Error", error });

};
};

const ptokenVerification=async(req,res)=>{
  try{
    const query=req.query;

    const ptoken=query.ptoken;

    const user=await User.findOne({ptoken:ptoken});

    if(!user){
      return res.status(404).json({message:"User not found"});

    }
    res.redirect(`https://teachersearch.in/setNewPassword?ptoken=${ptoken}`)
    //redirect to the url

  

  }
  catch(error){
console.error("token password error:", error);
  return res.status(500).json({ message: "Internal Server Error", error });
  };

};

const setNewPassword=async(req,res)=>{
  try{
  const {newPassword,confirmPassword}=req.body;
  const ptoken=req.query.ptoken;
  const user=await User.findOne({ptoken:ptoken});
  if(!user){
    return res.status(400).json({message:"User not found"});
  }
  if(newPassword===confirmPassword){
     user.password=confirmPassword;
     await user.save();
  };
  return res.status(200).json({message:"Password set successfully"});
}
catch(error){
console.error("Password error:", error);
return res.status(500).json({ message: "Internal Server Error", error });
}
};

module.exports={ loginUser,setPassword,verifyOtp,registerUser,logoutUser,forgotPassword,ptokenVerification,setNewPassword }




