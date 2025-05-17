const jwt = require("jsonwebtoken");

const authenticateTempToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const refreshToken = req.cookies?.refreshToken;

  if (!token && !refreshToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Try verifying access token first
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Access Token Valid:", decoded);
    return next();
  } catch (err) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token and no refresh token" });
    }

    try {
      // Verify refresh token
      const refDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
      const newAccessToken = jwt.sign(
        { id: refDecoded.id, role: refDecoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      req.user = refDecoded;
      res.setHeader("new-access-token", newAccessToken); // optional
      console.log("Refresh Token Used:", refDecoded);
      return next();
    } catch (refreshErr) {
      return res.status(403).json({ message: "Forbidden: Invalid Refresh Token" });
    }
  }
};

module.exports = { authenticateTempToken };
