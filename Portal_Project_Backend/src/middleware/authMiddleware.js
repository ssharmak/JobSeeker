const jwt = require("jsonwebtoken");
const redis=require("redis");
const redisClient=redis.createClient();
redisClient.get = util.promisify(redisClient.get);
const util = require("util");

const authenticateTempToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  // const refreshToken=req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded email to request
    next();
  } catch(err){
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({message: " Unauthorized: No refresh token"});
    }
    try{
      const isBlacklisted=redisClient.get(refreshToken)
        if(isBlacklisted) return res.Status(403).json({message:"Forbidden: Blacklisted token"});
      
    const refDecoded=jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
    

    const newAccessToken = jwt.sign({id: refDecoded.id,role: refDecoded.role},process.env.JWT_SECRET,{expiresIn: "15m"});
    req.user=refDecoded;
    res.setHeader("new-access-token", newAccessToken);
    next();
    
      
    }
    catch(error){
      res.status(400).json({ message: "Invalid Refresh Token" });
    }

    
  }
};

module.exports={ authenticateTempToken };
