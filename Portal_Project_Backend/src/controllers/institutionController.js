const Institution = require("../models/Institution");
const otp = require("../models/otp");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Jobs=require("../models/job");
const axios = require('axios');


const registerInstitution = async (req, res) => {
  const { name,street,city,state,postal_code, country, mobile_number, email } = req.body;

  try {
    // Check if an institution with the provided email already exists
    let institution = await Institution.findOne({ email });
    if (institution && institution.is_verified) {
      return res.status(400).json({ message: "Institution already exists" });
    }

    // If institution exists but is not verified, update details
    if (institution && !institution.is_verified) {
      institution.name = name;
      institution.address.street=street;
      institution.address.city=city;
      institution.address.state=state;
      institution.address.country = country;
      institution.mobile_number = mobile_number;
      await institution.save();
    } else if (!institution) {
      // Create a new institution record (without password)
      institution = new Institution({ name, address:{street:street,city:city,state:state,postal_code:postal_code,country:country}, mobile_number, email });
      await institution.save();
    }

    // Check if OTP was already sent and is still valid
    const existingOtp = await otp.findOne({ email });
    if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_Expiry * 1000) {
      const timeLeft = process.env.OTP_Expiry - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
      return res.status(400).json({
        message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
      });
    }

    // Generate a 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    await otp.create({ email, otp: otpCode });

    // Send OTP to institution email
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
    res.status(500).json({ message: err.message });
  }
};


// Verify OTP and mark institution as verified
const verifyOtpInstitution = async (req, res) => {
  try {
    const { otp1 } = req.body; // OTP provided by the institution

    // Find OTP record using the provided OTP
    const otpRecord = await otp.findOne({ otp: otp1 });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const institutionEmail = otpRecord.email;
    const institution = await Institution.findOne({ email: institutionEmail });
    if (!institution) {
      return res.status(400).json({ message: "Institution not found" });
    }
    if (institution.otp_verified===true) {
      return res.status(400).json({ message: "Institution already otp verified" });
    }

    institution.otp_verified=true;

    // Mark institution as verified
    await institution.save();

    // Delete OTP record after successful verification
    await otp.deleteOne({ email: institutionEmail });

    // Generate a temporary token (valid for 10 minutes) for password setup
    const tempToken = jwt.sign({ email: institutionEmail }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res.status(200).json({
      message: "OTP verified successfully. Please set your password.",
      token: tempToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Set Password (only password input; email comes from temporary token)
const setPasswordInstitution = async (req, res) => {
  try {
    const { password } = req.body;
    const institutionEmail = req.user?.email; // Retrieved via middleware

    if (!institutionEmail) {
      return res.status(400).json({ message: "User email not found in token" });
    }

    const institution = await Institution.findOne({ email: institutionEmail });
    if (!institution) {
      return res.status(400).json({ message: "Institution not found" });
    }
    if (!institution.otp_verified) {
      return res.status(400).json({ message: "Institution is not OTP verified yet" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    institution.password = hashedPassword;
    institution.is_verified = true;
    await institution.save();

    // Generate a JWT token for future authentication
    const token = jwt.sign(
      { id: institution._id, email: institution.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Password set successfully. Registration complete.", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const loginInstitution = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find institution by email
    const institution = await Institution.findOne({ email });

    if (!institution) {
      return res.status(400).json({ message: "Institution not found!" });
    }

    // Check if password exists in DB (some institutions might not have passwords)
    if (!institution.password) {
      return res.status(400).json({ message: "Password not set for this institution!" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, institution.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT tokens
    const token = jwt.sign({ id: institution._id, role: "institution" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ id: institution._id, role: "institution" }, process.env.JWT_SECRET_REFRESH);

    // Store refresh token in HTTP-only cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production (for HTTPS)
      sameSite: "Strict",
    });

    return res.json({
      message: "Login successful!",
      accessToken: token,
      refreshToken: refreshToken,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};


const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingOtp = await otp.findOne({ email });
    if (existingOtp && (Date.now() - existingOtp.createdAt) < process.env.OTP_Expiry * 1000) {
      const timeLeft = process.env.OTP_Expiry - Math.floor((Date.now() - existingOtp.createdAt) / 1000);
      return res.status(400).json({
        message: `OTP already sent! Please wait ${timeLeft} seconds before requesting again`,
      });
    }

    // Generate a 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    await otp.create({ email, otp: otpCode });

    // Send OTP to institution email
    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const addJob = async (req, res) => {
  try {
    // 1. Extract Institution_id from token (assuming you set it in req.user during authentication)
    const Institution_id = req.user?.id;

    if (!Institution_id) {
      return res.status(401).json({ message: "Unauthorized: Institution ID missing from token" });
    }

    // 2. Extract the rest from body
    const {
      title,
      department,
      address,
      category,
      employment_type,
      experience_level,
      min_experience,
      max_experience,
      description,
      requirements,
      prefered_qualifications,
      responsibilities,
      benefits,
      posted_date,
      closing_date,
      status,
      hiring_manager,
      recruiters,
      max_applications,
      is_active,
      allow_multiple_applications,
      salary_range
    } = req.body;

    // Validate the address fields
    if (!address || !address.street || !address.city || !address.state || !address.postal_code || !address.country) {
      return res.status(400).json({ message: "Address is missing required fields" });
    }


    const getGeolocation = async (address) => {
      const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: fullAddress,
          key: apiKey
        }
      });

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Geocoding failed:", response.data.status);
        return null;
      }
    };


    // Optional: Geolocation lookup for address
    const location = await getGeolocation(address);
    if (location) {
      address.latitude = location.lat;
      address.longitude = location.lng;
    }

    // 3. Create new job instance
    const newJob = new Jobs({
      Institution_id,
      title,
      department,
      address,
      category,
      employment_type,
      experience_level,
      min_experience,
      max_experience,
      description,
      requirements,
      prefered_qualifications,
      responsibilities,
      benefits,
      posted_date,
      closing_date,
      status,
      hiring_manager,
      recruiters,
      max_applications,
      is_active,
      allow_multiple_applications,
      salary_range
    });

    // 4. Save to database
    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      data: savedJob
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({
      message: error.message || "Something went wrong while posting job"
    });
  }
};



module.exports={ registerInstitution,verifyOtpInstitution,setPasswordInstitution,loginInstitution,resendOtp,addJob};
