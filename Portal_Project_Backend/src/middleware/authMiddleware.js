const jwt = require("jsonwebtoken");

const authenticateTempToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  const refreshToken=req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded email to request
    next();
  } catch(err){
    if(!refreshToken){
      return res.status(401).json({message: " Unauthorized: No refresh token"});
    }
    try{
    const refDecoded=jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
    const newAccessToken = jwt.sign({id: refDecoded.id,role: refDecoded.role},JWT_SECRET,{expiresIn: "15m"});
    res.setHeader("new-access-token",newAccessToken);
    req.user=refDecoded;
    next();
    }
    catch(error){
      res.status(400).message("Invalid refresh token");
    }

    
  }
};

module.exports={ authenticateTempToken };
