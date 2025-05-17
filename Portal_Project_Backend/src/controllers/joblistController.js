const Jobs=require("../models/job");
const Institution = require("../models/Institution");

const jobpostList = async (req, res) => {
  try {
    const jobpost = await Jobs.find().populate('Institution_id', 'name');
    res.status(200).json({ data: jobpost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Job post' });
  }
};


const jobslistcount = async (req, res) => {
  try {
    const jobCount = await Jobs.countDocuments(); 
    res.json({ count: jobCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job posts' });
  }
};

module.exports = { jobpostList,jobslistcount };
