
const admin= require("../models/admin");
const jwt= require("jsonwebtoken")
const Candidates = require("../models/candidates");
const sendEmail= require("../utils/sendEmail");


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let admin1 = await admin.findOne({ email });
        if (!admin1) {
            return res.status(400).json({ message: "admin does not exist" });
        }

        if (password !== admin1.password) {
            return res.status(400).json({ message: "Wrong Password" });
        }


        const token = jwt.sign(
            { id: admin1._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token: token, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.profileApproval= async(req,res) => {
    const unverified= await Candidates.find({admin_verfied:false});
    res.json(unverified)
  
};

exports.AppReq= async(req,res) =>{
    const aid=req.body;
    const cand=await Candidates.findById(aid);
    cand.admin_verfied=true;
    gmail=cand.email;
    await sendEmail(gmail, "Congratulations!!! Your Profile is approved by admin");
    res.status(200).message(`Candidate with ${aid} is verified successfully by admin`);
}


