const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide team member name"],
    maxLength: [100, "Name cannot exceed 100 characters"],
  },
  position: {
    type: String,
    required: [true, "Please provide position/title"],
    maxLength: [150, "Position cannot exceed 150 characters"],
  },
  photoUrl: {
    type: String,
    required: [true, "Please provide photo URL"],
  },
  description: {
    type: String,
    maxLength: [500, "Description cannot exceed 500 characters"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        if (!v) return true; // Email is optional
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  phone: {
    type: String,
    maxLength: [20, "Phone cannot exceed 20 characters"],
  },
  socialLinks: {
    linkedin: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
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
  department: {
    type: String,
    enum: ["Management", "Engineering", "Operations", "Sales", "HR", "Finance", "Other"],
    default: "Other",
  },
  joinedDate: {
    type: Date,
    default: Date.now,
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
teamSchema.index({ order: 1 }, { unique: true });

// Update the updatedAt field before saving
teamSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Team", teamSchema);
