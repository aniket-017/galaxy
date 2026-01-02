const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please provide contact type"],
    enum: ["office", "email"],
  },
  // For offices
  officeName: {
    type: String,
    required: function () {
      return this.type === "office";
    },
    maxLength: [100, "Office name cannot exceed 100 characters"],
  },
  address: {
    type: String,
    required: function () {
      return this.type === "office";
    },
    maxLength: [500, "Address cannot exceed 500 characters"],
  },
  pinCode: {
    type: String,
    required: function () {
      return this.type === "office";
    },
    maxLength: [10, "Pin code cannot exceed 10 characters"],
  },
  contactPerson: {
    type: String,
    maxLength: [100, "Contact person name cannot exceed 100 characters"],
  },
  phone: {
    type: String,
    maxLength: [20, "Phone number cannot exceed 20 characters"],
  },
  telephone: {
    type: String,
    maxLength: [30, "Telephone cannot exceed 30 characters"],
  },
  // For email queries
  queryType: {
    type: String,
    required: function () {
      return this.type === "email";
    },
    enum: ["marketing", "purchase", "hr", "recruitment"],
  },
  email: {
    type: String,
    required: function () {
      return this.type === "email";
    },
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  order: {
    type: Number,
    default: 1,
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

// Update the updatedAt field before saving
contactSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Contact", contactSchema);


