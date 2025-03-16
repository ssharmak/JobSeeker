const jwt = require("jsonwebtoken");

const singleToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded email to request
    next();
  } catch(err){
    return res.status(401).json({message: "Invalid or expired token"})
    
  }
};

module.exports={ singleToken };
