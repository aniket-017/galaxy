const CareerPhotos = require("../models/careerPhotosModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all career photos
exports.getAllCareerPhotos = catchAsyncErrors(async (req, res, next) => {
  const photos = await CareerPhotos.find({ isActive: true }).sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: photos.length,
    photos,
  });
});

// Get all career photos for admin (including inactive)
exports.getAllCareerPhotosAdmin = catchAsyncErrors(async (req, res, next) => {
  const photos = await CareerPhotos.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: photos.length,
    photos,
  });
});

// Create new career photo
exports.createCareerPhoto = catchAsyncErrors(async (req, res, next) => {
  const { imageUrl, title, description, order } = req.body;

  // Check if order already exists
  const existingPhoto = await CareerPhotos.findOne({ order });
  if (existingPhoto) {
    // Shift existing photos to make room
    await CareerPhotos.updateMany({ order: { $gte: order } }, { $inc: { order: 1 } });
  }

  const photo = await CareerPhotos.create({
    imageUrl,
    title,
    description,
    order,
  });

  res.status(201).json({
    success: true,
    photo,
  });
});

// Update career photo
exports.updateCareerPhoto = catchAsyncErrors(async (req, res, next) => {
  let photo = await CareerPhotos.findById(req.params.id);

  if (!photo) {
    return next(new ErrorHandler("Career photo not found", 404));
  }

  const { imageUrl, title, description, order } = req.body;
  const oldOrder = photo.order;

  // If order is changing, handle reordering
  if (order && order !== oldOrder) {
    const existingPhoto = await CareerPhotos.findOne({
      order,
      _id: { $ne: req.params.id },
    });

    if (existingPhoto) {
      if (order > oldOrder) {
        // Moving down: shift photos between oldOrder and order up
        await CareerPhotos.updateMany(
          {
            order: { $gt: oldOrder, $lte: order },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Moving up: shift photos between order and oldOrder down
        await CareerPhotos.updateMany(
          {
            order: { $gte: order, $lt: oldOrder },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: 1 } }
        );
      }
    }
  }

  photo = await CareerPhotos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    photo,
  });
});

// Delete career photo
exports.deleteCareerPhoto = catchAsyncErrors(async (req, res, next) => {
  const photo = await CareerPhotos.findById(req.params.id);

  if (!photo) {
    return next(new ErrorHandler("Career photo not found", 404));
  }

  const deletedOrder = photo.order;

  await photo.deleteOne();

  // Shift remaining photos down to fill the gap
  await CareerPhotos.updateMany({ order: { $gt: deletedOrder } }, { $inc: { order: -1 } });

  res.status(200).json({
    success: true,
    message: "Career photo deleted successfully",
  });
});

// Get single career photo
exports.getCareerPhoto = catchAsyncErrors(async (req, res, next) => {
  const photo = await CareerPhotos.findById(req.params.id);

  if (!photo) {
    return next(new ErrorHandler("Career photo not found", 404));
  }

  res.status(200).json({
    success: true,
    photo,
  });
});

// Reorder career photos
exports.reorderCareerPhotos = catchAsyncErrors(async (req, res, next) => {
  const { photos } = req.body; // Array of {id, order} objects

  if (!photos || !Array.isArray(photos)) {
    return next(new ErrorHandler("Please provide photos array", 400));
  }

  // Update each photo's order
  const updatePromises = photos.map((photoData) =>
    CareerPhotos.findByIdAndUpdate(photoData.id, { order: photoData.order }, { new: true, runValidators: true })
  );

  await Promise.all(updatePromises);

  const updatedPhotos = await CareerPhotos.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    message: "Career photos reordered successfully",
    photos: updatedPhotos,
  });
});
