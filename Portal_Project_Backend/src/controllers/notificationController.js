const mongoose = require('mongoose');
const JobApplication = require('../models/Jobs_Apply');

// Notification count for unseen applications
const instNotification = async (req, res) => {
  const institutionId = req.query.institutionId;

  if (!institutionId) {
    return res.status(400).json({ error: 'Institution ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(institutionId)) {
    return res.status(400).json({ error: 'Invalid Institution ID format' });
  }

  try {
    const count = await JobApplication.countDocuments({
      institutionId,
      seenByInstitution: false,
    });

    res.json({ count });
  } catch (err) {
    console.error('Failed to count applications:', err);
    res.status(500).json({ error: 'Failed to count applications', details: err.message });
  }
};

// Mark all as seen
const markNotification = async (req, res) => {
  const institutionId = req.query.institutionId;

  if (!institutionId) {
    return res.status(400).json({ error: 'Institution ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(institutionId)) {
    return res.status(400).json({ error: 'Invalid Institution ID format' });
  }

  try {
    await JobApplication.updateMany(
      { institutionId, seenByInstitution: false },
      { $set: { seenByInstitution: true } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to mark notifications as seen:', err);
    res.status(500).json({ error: 'Failed to update applications', details: err.message });
  }
};


// Get unseen applications
const getUnseenApplications = async (req, res) => {
  const institutionId = req.query.institutionId;

  if (!institutionId) {
    return res.status(400).json({ error: 'Institution ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(institutionId)) {
    return res.status(400).json({ error: 'Invalid Institution ID format' });
  }

  try {
    const applications = await JobApplication.find({
      institutionId,
      seenByInstitution: false,
    })
      .populate('candidate_id', 'first_name last_name email')
      .populate({ path: 'job_id', model: 'Jobs', select: 'title' });

    const formatted = applications.map((app) => ({
      jobTitle: app.job_id?.title || 'Unknown Job',
      applicantName: [app.candidate_id?.first_name, app.candidate_id?.last_name].filter(Boolean).join(' ') || 'Unknown',
      dateApplied: app.application_date,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Failed to fetch applications:', err);
    res.status(500).json({ error: 'Failed to fetch applications', details: err.message });
  }
};

module.exports = {instNotification, markNotification,  getUnseenApplications};
