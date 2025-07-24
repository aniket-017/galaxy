const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Please provide image URL"],
  },
  title: {
    type: String,
    required: [true, "Please provide title"],
    maxLength: [100, "Title cannot exceed 100 characters"],
  },
  subtitle: {
    type: String,
    required: [true, "Please provide subtitle"],
    maxLength: [150, "Subtitle cannot exceed 150 characters"],
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

// Ensure unique order values
carouselSchema.index({ order: 1 }, { unique: true });

// Update the updatedAt field before saving
carouselSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Carousel", carouselSchema);