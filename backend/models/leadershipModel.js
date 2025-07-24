const mongoose = require("mongoose");

const leadershipSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Please provide role"],
    enum: ["Chairman", "Director"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxLength: [100, "Name cannot exceed 100 characters"],
  },
  photoUrl: {
    type: String,
    required: [true, "Please provide photo URL"],
  },
  title: {
    type: String,
    maxLength: [200, "Title cannot exceed 200 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide message content"],
  },
  signature: {
    type: String,
    maxLength: [500, "Signature cannot exceed 500 characters"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique role values (only one Chairman and one Director)
leadershipSchema.index({ role: 1 }, { unique: true });

// Update the updatedAt field before saving
leadershipSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Leadership", leadershipSchema);
