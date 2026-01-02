const Contact = require("../models/contactModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all contacts (public - only active)
exports.getAllContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find({ isActive: true }).sort({ type: 1, order: 1 });

  const offices = contacts.filter((c) => c.type === "office");
  const emails = contacts.filter((c) => c.type === "email");

  res.status(200).json({
    success: true,
    offices,
    emails,
  });
});

// Get all contacts for admin (including inactive)
exports.getAllContactsAdmin = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find().sort({ type: 1, order: 1 });

  const offices = contacts.filter((c) => c.type === "office");
  const emails = contacts.filter((c) => c.type === "email");

  res.status(200).json({
    success: true,
    offices,
    emails,
    contacts,
  });
});

// Create new contact
exports.createContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    contact,
  });
});

// Update contact
exports.updateContact = catchAsyncErrors(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    contact,
  });
});

// Delete contact
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

// Get single contact
exports.getContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  res.status(200).json({
    success: true,
    contact,
  });
});


