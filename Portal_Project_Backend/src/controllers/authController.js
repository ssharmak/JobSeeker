const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const User= require("../models/Users");
const otp=require("../models/otp");
const sendEmail= require("../utils/sendEmail");
const crypto= require('crypto');
const Candidate=require("../models/candidates");
const multer = require("multer");

  
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
  
  
  
  // Configure file storage for resume uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/resumes/"); // Change to your upload directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  // Register User Function
  const registerUser = async (req, res) => {
    try {
      upload.single("resume")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "File upload error" });
        }
  
        const { name, phone_number, email } = req.body;
        const resume = req.file ? req.file.path : null;
  
        // Validate required fields
        if (!name || !phone_number || !email || !resume) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        // Check if a user with the provided email already exists
        let user = await User.findOne({ email });
  
        if (user && user.is_verified) {
          return res.status(400).json({ message: "User already exists" });
        }
  
        // If user exists but is not verified, update details
        if (user && !user.is_verified) {
          user.name = name;
          user.phone_number = phone_number;
          user.resume = resume;
          await user.save();
        } else if (!user) {
          // Create a new user record
          user = new User({ name, phone_number, email, resume });
          await user.save();
        }
  
        // Check if OTP was already sent and is still valid
        const existingOtp = await Otp.findOne({ email });
        if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_EXPIRY * 1000) {
          const timeLeft = process.env.OTP_EXPIRY - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
          return res.status(400).json({
            message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
          });
        }
  
        // Generate a 6-digit OTP
        const otpCode = crypto.randomInt(100000, 999999).toString();
        await Otp.create({ email, otp: otpCode });
  
        // Send OTP to user email
        await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);
  
        res.status(200).json({ message: "OTP sent successfully" });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = registerUser;
    


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

      if(user.role==="user"){
        const newCandidate = new Candidate({
          main_user: user._id,  
          first_name: username,  
          last_name: "",
          email: email,
          phone: "",
          date_of_birth: null,
          address: {
              street: "",
              city: "",
              state: "",
              postal_code: "",
              country: country
          },
          linkedin_profile: "",
          portfolio_website: "",
          education: [],
          work_experience: [],
          skills: [],
          certifications: [],
          resume: null,
          applications: [],
          status: "pending",
          email_verified: false,
          phone_verified: false,
          admin_verified: false
      });

      await newCandidate.save();

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

      
      const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"15m"});
      const refToken= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_REFRESH);

      //Storing the refresh Token in cookies to use it later
      res.cookie("refreshToken", refToken, {
        httpOnly: true,
        secure: true, // Set to true in production (for HTTPS)
        sameSite: "Strict",
      });

     //We can change the url paths when they finalised  
      if (user.role === 'admin') {
          return res.json({message: `AccessToken: ${token} and refreshToken: ${refToken}`},{ redirect: '/admin/dashboard' });
      } else {
          return res.json({message: `AccessToken: ${token} and refreshToken: ${refToken}`},{ redirect: '/user/dashboard' });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
  }
};


module.exports={ loginUser,setPassword,verifyOtp,registerUser }




