const Candidate = require("../models/candidates");

const searchCandidates = async (req, res) => {
    try {
      const { position } = req.body;
  
      // Search inside the work_experience array for position match
      const candidates = await Candidate.find({
        'work_experience.position': { $regex: position, $options: 'i' }, // case-insensitive
      });
  
      res.status(200).json(candidates);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {searchCandidates}