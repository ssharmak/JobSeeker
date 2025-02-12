const jwt= require("jsonwebtoken");

exports.authenticateUser = (req,res,next) => {
    const token= req.header("Authorization");

    if(!token) return res.status(401).json({message:"Access denied. No such user exists"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(err){
        res.status(400).json({message:"Inavlid token"});
    }
};