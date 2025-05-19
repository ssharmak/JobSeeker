const { Candidate } = require('../models/candidates');


const candidateprofileList = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({
            data : candidates});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching candidate profiles' });
    }
};

module.exports = { candidateprofileList };
