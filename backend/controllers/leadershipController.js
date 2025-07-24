const Leadership = require("../models/leadershipModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all leadership messages
exports.getAllLeadership = catchAsyncErrors(async (req, res, next) => {
  const leaders = await Leadership.find({ isActive: true }).sort({ role: 1 });

  res.status(200).json({
    success: true,
    count: leaders.length,
    leaders,
  });
});

// Get all leadership messages for admin (including inactive)
exports.getAllLeadershipAdmin = catchAsyncErrors(async (req, res, next) => {
  const leaders = await Leadership.find().sort({ role: 1 });

  res.status(200).json({
    success: true,
    count: leaders.length,
    leaders,
  });
});

// Create new leadership message
exports.createLeadership = catchAsyncErrors(async (req, res, next) => {
  const { role, name, photoUrl, title, message, signature } = req.body;

  // Check if role already exists
  const existingLeader = await Leadership.findOne({ role });
  if (existingLeader) {
    return next(new ErrorHandler(`${role} already exists. Please update the existing record.`, 400));
  }

  const leader = await Leadership.create({
    role,
    name,
    photoUrl,
    title,
    message,
    signature,
  });

  res.status(201).json({
    success: true,
    leader,
  });
});

// Update leadership message
exports.updateLeadership = catchAsyncErrors(async (req, res, next) => {
  let leader = await Leadership.findById(req.params.id);

  if (!leader) {
    return next(new ErrorHandler("Leadership message not found", 404));
  }

  leader = await Leadership.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    leader,
  });
});

// Delete leadership message
exports.deleteLeadership = catchAsyncErrors(async (req, res, next) => {
  const leader = await Leadership.findById(req.params.id);

  if (!leader) {
    return next(new ErrorHandler("Leadership message not found", 404));
  }

  await leader.deleteOne();

  res.status(200).json({
    success: true,
    message: "Leadership message deleted successfully",
  });
});

// Get single leadership message
exports.getLeadership = catchAsyncErrors(async (req, res, next) => {
  const leader = await Leadership.findById(req.params.id);

  if (!leader) {
    return next(new ErrorHandler("Leadership message not found", 404));
  }

  res.status(200).json({
    success: true,
    leader,
  });
});

// Get leadership by role
exports.getLeadershipByRole = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.params;

  const leader = await Leadership.findOne({ role, isActive: true });

  if (!leader) {
    return next(new ErrorHandler(`${role} message not found`, 404));
  }

  res.status(200).json({
    success: true,
    leader,
  });
});
