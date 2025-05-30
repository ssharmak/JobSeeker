const Credit = require('../models/credit');


const addCredits = async (req, res) => {
  try {
    const { userId, totalcredits, description = '' } = req.body;

    if (!userId || typeof totalcredits !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    let creditAccount = await Credit.findOne({ userId });

    if (!creditAccount) {
      creditAccount = new Credit({
        userId,
        totalCreditsEarned: 0,
        currentCredits: 0,
        creditTransactions: [],
      });
    }

    creditAccount.totalCreditsEarned += totalcredits;
    creditAccount.currentCredits += totalcredits;

    creditAccount.creditTransactions.push({
      type: 'credit',
      amount: totalcredits,
      balanceAfter: creditAccount.currentCredits,
      description,
      date: new Date(),
    });

    const savedAccount = await creditAccount.save();

    return res.status(200).json({ success: true, data: savedAccount });
  } catch (error) {
    console.error('Error adding credits:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {addCredits};