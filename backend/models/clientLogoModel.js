const mongoose = require("mongoose");

const clientLogoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Please provide image URL"],
  },
  name: {
    type: String,
    default: "",
    maxLength: [120, "Name cannot exceed 120 characters"],
  },
  order: {
    type: Number,
    required: [true, "Please provide order"],
    min: [1, "Order must be at least 1"],
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

clientLogoSchema.index({ order: 1 }, { unique: true });

clientLogoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("ClientLogo", clientLogoSchema);
