const Carousel = require("../models/carouselModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all carousel slides
exports.getAllCarouselSlides = catchAsyncErrors(async (req, res, next) => {
  const slides = await Carousel.find({ isActive: true }).sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: slides.length,
    slides,
  });
});

// Get all carousel slides for admin (including inactive)
exports.getAllCarouselSlidesAdmin = catchAsyncErrors(async (req, res, next) => {
  const slides = await Carousel.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: slides.length,
    slides,
  });
});

// Create new carousel slide
exports.createCarouselSlide = catchAsyncErrors(async (req, res, next) => {
  const { imageUrl, title, subtitle, order } = req.body;

  // Check if order already exists
  const existingSlide = await Carousel.findOne({ order });
  if (existingSlide) {
    // Shift existing slides to make room
    await Carousel.updateMany({ order: { $gte: order } }, { $inc: { order: 1 } });
  }

  const slide = await Carousel.create({
    imageUrl,
    title,
    subtitle,
    order,
  });

  res.status(201).json({
    success: true,
    slide,
  });
});

// Update carousel slide
exports.updateCarouselSlide = catchAsyncErrors(async (req, res, next) => {
  let slide = await Carousel.findById(req.params.id);

  if (!slide) {
    return next(new ErrorHandler("Carousel slide not found", 404));
  }

  const { imageUrl, title, subtitle, order } = req.body;
  const oldOrder = slide.order;

  // If order is changing, handle reordering
  if (order && order !== oldOrder) {
    const existingSlide = await Carousel.findOne({
      order,
      _id: { $ne: req.params.id },
    });

    if (existingSlide) {
      if (order > oldOrder) {
        // Moving down: shift slides between oldOrder and order up
        await Carousel.updateMany(
          {
            order: { $gt: oldOrder, $lte: order },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: -1 } }
        );
      } else {
        // Moving up: shift slides between order and oldOrder down
        await Carousel.updateMany(
          {
            order: { $gte: order, $lt: oldOrder },
            _id: { $ne: req.params.id },
          },
          { $inc: { order: 1 } }
        );
      }
    }
  }

  slide = await Carousel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    slide,
  });
});

// Delete carousel slide
exports.deleteCarouselSlide = catchAsyncErrors(async (req, res, next) => {
  const slide = await Carousel.findById(req.params.id);

  if (!slide) {
    return next(new ErrorHandler("Carousel slide not found", 404));
  }

  const deletedOrder = slide.order;

  await slide.deleteOne();

  // Shift remaining slides down to fill the gap
  await Carousel.updateMany({ order: { $gt: deletedOrder } }, { $inc: { order: -1 } });

  res.status(200).json({
    success: true,
    message: "Carousel slide deleted successfully",
  });
});

// Get single carousel slide
exports.getCarouselSlide = catchAsyncErrors(async (req, res, next) => {
  const slide = await Carousel.findById(req.params.id);

  if (!slide) {
    return next(new ErrorHandler("Carousel slide not found", 404));
  }

  res.status(200).json({
    success: true,
    slide,
  });
});

// Reorder carousel slides
exports.reorderCarouselSlides = catchAsyncErrors(async (req, res, next) => {
  const { slides } = req.body; // Array of {id, order} objects

  if (!slides || !Array.isArray(slides)) {
    return next(new ErrorHandler("Please provide slides array", 400));
  }

  // Update each slide's order
  const updatePromises = slides.map((slideData) =>
    Carousel.findByIdAndUpdate(slideData.id, { order: slideData.order }, { new: true, runValidators: true })
  );

  await Promise.all(updatePromises);

  const updatedSlides = await Carousel.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    message: "Carousel slides reordered successfully",
    slides: updatedSlides,
  });
});
