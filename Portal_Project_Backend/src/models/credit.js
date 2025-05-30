const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Institution'
  },
  totalCreditsEarned: {
    type: Number,
    default: 0,
    min: 0
  },
  currentCredits: {
    type: Number,
    default: 0,
    min: 0
  },
  creditTransactions: [{
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    balanceAfter: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    referenceId: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // handles createdAt and updatedAt automatically
});

// ✅ Unique index to ensure one credit record per user
creditSchema.index({ userId: 1 }, { unique: true });

const Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;
