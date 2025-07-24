const Team = require("../models/teamModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all team members
exports.getAllTeamMembers = catchAsyncErrors(async (req, res, next) => {
  const members = await Team.find({ isActive: true }).sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: members.length,
    members,
  });
});

// Get all team members for admin (including inactive)
exports.getAllTeamMembersAdmin = catchAsyncErrors(async (req, res, next) => {
  const members = await Team.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: members.length,
    members,
  });
});

// Create new team member
exports.createTeamMember = catchAsyncErrors(async (req, res, next) => {
  const { name, position, photoUrl, description, email, phone, socialLinks, order, department } = req.body;

  // Check if order already exists
  const existingMember = await Team.findOne({ order });
  if (existingMember) {
    // Shift existing members to make room
    await Team.updateMany({ order: { $gte: order } }, { $inc: { order: 1 } });
  }

  const member = await Team.create({
    name,
    position,
    photoUrl,
    description,
    email,
    phone,
    socialLinks,
    order,
    department,
  });

  res.status(201).json({
    success: true,
    member,
  });
});

// Update team member
exports.updateTeamMember = catchAsyncErrors(async (req, res, next) => {
  let member = await Team.findById(req.params.id);

  if (!member) {
    return next(new ErrorHandler("Team member not found", 404));
  }

  const { name, position, photoUrl, description, email, phone, socialLinks, order, department } = req.body;
  const oldOrder = member.order;

  // If order is changing, handle reordering
  if (order && order !== oldOrder) {
    const existingMember = await Team.findOne({
      order,
      _id: { $ne: req.params.id },
    });

    if (existingMember) {
      if (order > oldOrder) {
        // Moving down: shift members between oldOrder and order up
        await Team.updateMany(
          {
            order: { $gt: oldOrder, $lte: order },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Moving up: shift members between order and oldOrder down
        await Team.updateMany(
          {
            order: { $gte: order, $lt: oldOrder },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: 1 } }
        );
      }
    }
  }

  member = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    member,
  });
});

// Delete team member
exports.deleteTeamMember = catchAsyncErrors(async (req, res, next) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    return next(new ErrorHandler("Team member not found", 404));
  }

  const deletedOrder = member.order;

  await member.deleteOne();

  // Shift remaining members down to fill the gap
  await Team.updateMany({ order: { $gt: deletedOrder } }, { $inc: { order: -1 } });

  res.status(200).json({
    success: true,
    message: "Team member deleted successfully",
  });
});

// Get single team member
exports.getTeamMember = catchAsyncErrors(async (req, res, next) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    return next(new ErrorHandler("Team member not found", 404));
  }

  res.status(200).json({
    success: true,
    member,
  });
});

// Reorder team members
exports.reorderTeamMembers = catchAsyncErrors(async (req, res, next) => {
  const { members } = req.body; // Array of {id, order} objects

  if (!members || !Array.isArray(members)) {
    return next(new ErrorHandler("Please provide members array", 400));
  }

  // Update each member's order
  const updatePromises = members.map((memberData) =>
    Team.findByIdAndUpdate(memberData.id, { order: memberData.order }, { new: true, runValidators: true })
  );

  await Promise.all(updatePromises);

  const updatedMembers = await Team.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    message: "Team members reordered successfully",
    members: updatedMembers,
  });
});
