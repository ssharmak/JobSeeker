const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const User= require("../models/Users");

exports.registerAdmin= async(req, res) => {
    const {username, email, password} = req.body;

    try{
        let admin= await( User.findOne({email}));
        if (admin) return res.status(400).json({message:"Admin already exists"});

        const hashedPassword= await bcrypt.hash(password,10);
        admin= new User({username,email,password: hashedPassword,role: "admin"});
        await admin.save();

        res.status(201).json({message: "Admin registartion successful"});

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
};

exports.loginAdmin= async(req,res) =>{
    const {email,password} = req.body;

    try{
        let user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User does not exist please register"});

        if(!user.role=="admin") return res.status(400).json({message:"User is not an admin"}); 

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Wrong Password"});
        

        
        
        //JWT Token Generation
        const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});
         
        res.json({token:token,message: "Login successful"});

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};




