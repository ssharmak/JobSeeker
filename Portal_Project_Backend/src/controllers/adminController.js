
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Candidates = require("../models/candidates");
const sendEmail = require("../utils/sendEmail");
const Status = require("../models/application_status");

// exports.loginAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let admin1 = await admin.findOne({ email });
//         if (!admin1) {
//             return res.status(400).json({ message: "Admin does not exist" });
//         }

//         const isMatch = await bcrypt.compare(password, admin1.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Wrong Password" });
//         }

//         const token = jwt.sign(
//             { id: admin1._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.json({ token: token, message: "Login successful" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const profileApproval = async (req, res) => {
    try {
        const unverified = await Candidates.find({ admin_verified: false });
        res.json(unverified);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const AppReq = async (req, res) => {
    try {
        const { id } = req.params;
        const cand = await Candidates.findById(id);
        if (!cand) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        cand.admin_verified = true;
        await cand.save();

        const gmail = cand.email;
        await sendEmail(gmail, "Congratulations!!! Your Profile is approved by admin");

        let st = await Status.findOne({ id: cand.email });
        if (!st) {
            await Status.create({ id: cand.email, latest_status: "Approved" });
        } else {
            st.latest_status = "Approved";
            await st.save();
        }

        res.status(200).json({ message: `Candidate with ID ${id} is verified successfully by admin` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const RejRequest = async (req, res) => {
    try {
        const { reason } = req.body;
        const { id } = req.params;
        const cand = await Candidates.findById(id);
        if (!cand) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        const gmail = cand.email;
        await sendEmail(gmail, "Your profile is rejected. Do the following corrections and resubmit", reason);

        let st = await Status.findOne({ id: cand.email });
        if (!st) {
            await Status.create({ id: cand.email, latest_status: "Rejected", rejection_counts: 1, Admin_comments: reason });
        } else {
            st.latest_status = "Rejected";
            st.rejection_counts += 1;
            st.Admin_comments = reason;
            await st.save();
        }

        res.status(200).json({ message: `Candidate with ID ${id} has been rejected successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports={ profileApproval, AppReq, RejRequest  }