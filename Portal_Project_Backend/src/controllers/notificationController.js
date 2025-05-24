const JobApplication = require('../models/Jobs_Apply');

const instNotification = async (req, res) => {
  const institutionId = req.query.institutionId;

  if (!institutionId) {
    return res.status(400).json({ error: 'Institution ID is required' });
  }

  const count = await JobApplication.countDocuments({
    institutionId,
    seenByInstitution: false,
  });

  res.json({ count });
};


const markNotification = async (req, res) => {
  const institutionId = req.query.institutionId;

  if (!institutionId) {
    return res.status(400).json({ error: 'Institution ID is required' });
  }

  await JobApplication.updateMany(
    { institutionId, seenByInstitution: false },
    { $set: { seenByInstitution: true } }
  );

  res.json({ success: true });
};

module.exports = {instNotification,markNotification}