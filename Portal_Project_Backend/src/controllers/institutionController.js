const Institution = require("../models/Institution");
const otp = require("../models/otp");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration (without password)
const registerInstitution = async (req, res) => {
  const { name, country, mobile_number, email } = req.body;

  try {
    // Check if an institution with the provided email already exists
    let institution = await Institution.findOne({ email });
    if (institution && institution.is_verified) {
      return res.status(400).json({ message: "Institution already exists" });
    }

    // If institution exists but is not verified, update details
    if (institution && !institution.is_verified) {
      institution.name = name;
      institution.address.country = country;
      institution.mobile_number = mobile_number;
      await institution.save();
    } else if (!institution) {
      // Create a new institution record (without password)
      institution = new Institution({ name, country, mobile_number, email });
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
    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);

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
    const { password } = req.body; // Only the password is input by the institution
    // Retrieve email from temporary token (set via middleware)
    const institutionEmail = req.user?.email;
    if (!institutionEmail) {
      return res.status(400).json({ message: "User email not found in token" });
    }

    const institution = await Institution.findOne({ email: institutionEmail });
    if (!institution) {
      return res.status(400).json({ message: "Institution not found" });
    }
    if (!institution.otp_verified) {
      return res.status(400).json({ message: "Institution is not otp verified yet" });
    }

    // Hash the password and update the institution record
    const hashedPassword = await bcrypt.hash(password, 10);
    institution.password = hashedPassword;
    institution.is_verified = true;
    await institution.save();

    // Optionally, generate a JWT token for future authentication
    const token = jwt.sign({ id: institution._id, email: institution.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
    const token = jwt.sign({ id: institution._id, role: "institution" }, process.env.JWT_SECRET, { expiresIn: "15m" });
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
      redirect: "/institution/dashboard",
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


module.exports={ registerInstitution,verifyOtpInstitution,setPasswordInstitution,loginInstitution,resendOtp };
