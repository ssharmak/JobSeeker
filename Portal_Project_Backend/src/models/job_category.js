const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Description: {
      type: String,
      required: false,
    },
    ParentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "CreatedAt", updatedAt: "UpdatedAt" },
  }
);

module.exports = mongoose.model("Category", CategorySchema);
