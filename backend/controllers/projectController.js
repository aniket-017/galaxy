const mongoose = require("mongoose");
const Project = require("../models/Project");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { uploadToS3 } = require("../utils/s3");

// Create Project -- Admin
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Received request body:", req.body); // Debug log
    if (req.files && req.files.images) {
      let imageFiles = req.files.images;

      // Handle both single and multiple file uploads
      if (!Array.isArray(imageFiles)) {
        imageFiles = [imageFiles];
      }

      images = await Promise.all(
        imageFiles.map(async (file) => {
          return await uploadToS3(file, "projects");
        })
      );
    }

    // Ensure project brief is properly formatted
    const projectBrief = req.body.projectBrief || {};
    console.log("Project brief before creation:", projectBrief); // Debug log

    // Create the project with all data
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      projectBrief: projectBrief,
      images: req.body.images || images,
    });

    console.log("Created project:", project); // Debug log

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    console.error("Error details:", error.message); // Debug log
    next(error);
  }
});

// Get All Projects
exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

// Get Single Project
exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Update Project -- Admin
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log("Received request body:", req.body); // Debug log
  let project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  // If there are new files to upload
  let images = project.images;

  if (req.files && req.files.images) {
    let imageFiles = req.files.images;

    if (!Array.isArray(imageFiles)) {
      imageFiles = [imageFiles];
    }

    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        return await uploadToS3(file, "projects");
      })
    );
    images = [...images, ...uploadedImages];
  }

  // Update project fields
  project.title = req.body.title;
  project.description = req.body.description;
  project.category = req.body.category;
  project.subcategory = req.body.subcategory;
  project.projectBrief = req.body.projectBrief;
  project.images = req.body.images || images;
  project.updatedAt = Date.now();

  // Save the updated project
  await project.save();

  res.status(200).json({
    success: true,
    project,
  });
});

// Delete Project -- Admin
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  // Note: S3 deletion logic can be added here if needed, 
  // but usually we keep them or handle via lifecycle policies.

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully",
  });
});

// Get projects by category
exports.getProjectsByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;
  const projects = await Project.find({ category });

  res.status(200).json({
    success: true,
    projects,
  });
});

// Get projects by category and subcategory
exports.getProjectsByCategoryAndSubcategory = catchAsyncErrors(async (req, res, next) => {
  const { category, subcategory } = req.params;
  const projects = await Project.find({ category, subcategory });

  res.status(200).json({
    success: true,
    projects,
  });
});

// Search projects
exports.searchProjects = catchAsyncErrors(async (req, res, next) => {
  const { query } = req.query;
  const projects = await Project.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).sort({
    score: { $meta: "textScore" },
  });

  res.status(200).json({
    success: true,
    projects,
  });
});
