const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    maxLength: [50, "First name cannot exceed 50 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    maxLength: [50, "Last name cannot exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "Please provide a valid email",
    },
  },
  qualification: {
    type: String,
    required: [true, "Please provide qualification"],
    maxLength: [100, "Qualification cannot exceed 100 characters"],
  },
  experience: {
    type: String,
    required: [true, "Please provide experience"],
    enum: ["0-1", "1-3", "3-6", "6-12", "12-20", "20-30", "30+"],
  },
  designation: {
    type: String,
    required: [true, "Please provide designation"],
    maxLength: [100, "Designation cannot exceed 100 characters"],
  },
  location: {
    type: String,
    required: [true, "Please provide current location"],
    maxLength: [100, "Location cannot exceed 100 characters"],
  },
  countryCode: {
    type: String,
    default: "+91",
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    validate: {
      validator: function (phone) {
        return /^\d{10}$/.test(phone);
      },
      message: "Please provide a valid 10-digit phone number",
    },
  },
  resumeUrl: {
    type: String,
    required: [true, "Please provide resume"],
  },
  resumeOriginalName: {
    type: String,
    required: [true, "Resume original name is required"],
  },
  status: {
    type: String,
    enum: ["pending", "under_review", "shortlisted", "rejected", "hired"],
    default: "pending",
  },
  notes: {
    type: String,
    maxLength: [1000, "Notes cannot exceed 1000 characters"],
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  reviewedBy: {
    type: String, // Admin who reviewed
  },
  reviewedAt: {
    type: Date,
  },
});

// Update the lastUpdated field before saving
jobApplicationSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

// Create full name virtual
jobApplicationSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Create phone with country code virtual
jobApplicationSchema.virtual("fullPhone").get(function () {
  return `${this.countryCode} ${this.phone}`;
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
