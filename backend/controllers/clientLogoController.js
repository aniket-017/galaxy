const ClientLogo = require("../models/clientLogoModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { uploadToS3 } = require("../utils/s3");
const { applyOrdersTwoPhase } = require("../utils/reorderSequential");

exports.getClientLogos = catchAsyncErrors(async (req, res, next) => {
  const logos = await ClientLogo.find({ isActive: true }).sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: logos.length,
    logos,
  });
});

exports.getAllClientLogosAdmin = catchAsyncErrors(async (req, res, next) => {
  const logos = await ClientLogo.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: logos.length,
    logos,
  });
});

exports.createClientLogo = catchAsyncErrors(async (req, res, next) => {
  let { imageUrl, name, order } = req.body;
  const orderNum = order !== undefined && order !== "" ? parseInt(order, 10) : 1;
  if (Number.isNaN(orderNum)) {
    return next(new ErrorHandler("Invalid order", 400));
  }

  if (req.files && req.files.image) {
    imageUrl = await uploadToS3(req.files.image, "client-logos");
  }

  if (!imageUrl) {
    return next(new ErrorHandler("Please provide an image file or image URL", 400));
  }

  const existing = await ClientLogo.findOne({ order: orderNum });
  if (existing) {
    await ClientLogo.updateMany({ order: { $gte: orderNum } }, { $inc: { order: 1 } });
  }

  const logo = await ClientLogo.create({
    imageUrl,
    name: name || "",
    order: orderNum,
  });

  res.status(201).json({
    success: true,
    logo,
  });
});

exports.updateClientLogo = catchAsyncErrors(async (req, res, next) => {
  let logo = await ClientLogo.findById(req.params.id);

  if (!logo) {
    return next(new ErrorHandler("Client logo not found", 404));
  }

  let { imageUrl, name, order } = req.body;

  if (req.files && req.files.image) {
    imageUrl = await uploadToS3(req.files.image, "client-logos");
  }

  const oldOrder = logo.order;
  let orderNum = order !== undefined && order !== "" ? parseInt(order, 10) : logo.order;
  if (order !== undefined && order !== "" && Number.isNaN(orderNum)) {
    return next(new ErrorHandler("Invalid order", 400));
  }

  if (orderNum !== oldOrder) {
    const list = await ClientLogo.find().sort({ order: 1 }).lean();
    const currentId = req.params.id.toString();
    const idx = list.findIndex((l) => l._id.toString() === currentId);
    if (idx === -1) {
      return next(new ErrorHandler("Client logo not found", 404));
    }

    const moving = list[idx];
    const rest = list.filter((l) => l._id.toString() !== currentId);
    const insertAt = Math.min(Math.max(0, orderNum - 1), rest.length);
    rest.splice(insertAt, 0, moving);
    const orderedIds = rest.map((l) => l._id);
    await applyOrdersTwoPhase(ClientLogo, orderedIds);
  }

  const updateData = {
    ...(name !== undefined && { name }),
    ...(orderNum === oldOrder ? { order: orderNum } : {}),
    ...(imageUrl && { imageUrl }),
  };

  if (Object.keys(updateData).length > 0) {
    logo = await ClientLogo.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } else {
    logo = await ClientLogo.findById(req.params.id);
  }

  res.status(200).json({
    success: true,
    logo,
  });
});

exports.deleteClientLogo = catchAsyncErrors(async (req, res, next) => {
  const logo = await ClientLogo.findById(req.params.id);

  if (!logo) {
    return next(new ErrorHandler("Client logo not found", 404));
  }

  const deletedOrder = logo.order;

  await logo.deleteOne();

  await ClientLogo.updateMany({ order: { $gt: deletedOrder } }, { $inc: { order: -1 } });

  res.status(200).json({
    success: true,
    message: "Client logo deleted successfully",
  });
});

exports.getClientLogo = catchAsyncErrors(async (req, res, next) => {
  const logo = await ClientLogo.findById(req.params.id);

  if (!logo) {
    return next(new ErrorHandler("Client logo not found", 404));
  }

  res.status(200).json({
    success: true,
    logo,
  });
});

exports.reorderClientLogos = catchAsyncErrors(async (req, res, next) => {
  const { logos: logoPayload } = req.body;

  if (!logoPayload || !Array.isArray(logoPayload)) {
    return next(new ErrorHandler("Please provide logos array", 400));
  }

  const sorted = [...logoPayload].sort((a, b) => Number(a.order) - Number(b.order));
  const orderedIds = sorted.map((item) => item.id);

  await applyOrdersTwoPhase(ClientLogo, orderedIds);

  const updated = await ClientLogo.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    message: "Client logos reordered successfully",
    logos: updated,
  });
});
