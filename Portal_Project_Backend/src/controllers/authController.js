const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const User= require("../models/Users");
const otp=require("../models/otp");
const sendEmail= require("../utils/sendEmail");
const crypto= require('crypto');
const Users = require("../models/Users");

exports.registerUser = async (req, res) => {
    const { username, email } = req.body; 
  
    try {
      // Check if the admin already exists and is verified
      let user = await User.findOne({ email });
      if (user && user.is_verified) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // If the user exists but is not verified, update the username and proceed to set the password later
      if (user && !user.is_verified) {
        user.username = username; 
        await user.save(); 
      } else if (!user) {
       
        const newUser = new User({ username, email });
        await newUser.save();
      }
  
      // Check if OTP has already been sent recently (within the expiry time)
      const existingOtp = await otp.findOne({ email });
      if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_Expiry * 1000) {
        const timeLeft = process.env.OTP_Expiry - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
        return res.status(400).json({
          message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
        });
      }
  
      // Generate a new OTP code
      const otpCode = crypto.randomInt(100000, 999999).toString();
      await otp.create({ email, otp: otpCode });
  
      // Send the OTP to the user's email
      await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);
  
      // Respond with a success message
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


exports.verifyOtp = async (req, res) => {
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
  


  exports.setPassword = async (req, res) => {
    try {
      const { password } = req.body; // Only password is taken as input
  
      // Retrieve email from the authenticated session (or request object)
      const userEmail = req.user?.email; // Ensure email is stored in req.user after OTP verification
  
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
      user.is_verified=true;
      await user.save();
  
      // Optionally, generate a JWT token upon successful password setup
    
      res.status(200).json({
        message: "Password set successfully. Registration complete.",
        token,
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
exports.loginUser=async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await Users.findOne({ email }); 

      if (!user) {
          return res.status(400).json({ message: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credentials!" });
      }

      
      const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});
      const refToken= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_REFRESH);

     //We can change the url paths when they finalised  
      if (user.role === 'admin') {
          return res.json({ redirect: '/admin/dashboard' });
      } else if (user.role === 'institution') {
          return res.json({ redirect: '/institution/dashboard' });
      } else {
          return res.json({ redirect: '/user/dashboard' });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
  }
};




