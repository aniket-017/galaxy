const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Project -- Admin
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  try {
    let photos = [];
    let videos = [];

    if (req.files) {
      const { photos: photoFiles, videos: videoFiles } = req.files;

      if (photoFiles) {
        photos = await Promise.all(
          photoFiles.map(async (file) => {
            const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
              folder: 'projects/photos',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
      }

      if (videoFiles) {
        videos = await Promise.all(
          videoFiles.map(async (file) => {
            const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
              resource_type: 'video',
              folder: 'projects/videos',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
      }
    }

    const project = await Project.create({
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      photos,
      videos,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
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
    return next(new ErrorHander('Project not found', 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Update Project -- Admin
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHander('Project not found', 404));
  }

  // If there are new files to upload
  let photos = project.photos;
  let videos = project.videos;

  if (req.files) {
    const { photos: photoFiles, videos: videoFiles } = req.files;

    if (photoFiles) {
      photos = await Promise.all(
        photoFiles.map(async (file) => {
          const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'projects/photos',
          });
          return {
            public_id: result.public_id,
            url: result.secure_url,
          };
        })
      );
    }

    if (videoFiles) {
      videos = await Promise.all(
        videoFiles.map(async (file) => {
          const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            resource_type: 'video',
            folder: 'projects/videos',
          });
          return {
            public_id: result.public_id,
            url: result.secure_url,
          };
        })
      );
    }
  }

  project = await Project.findByIdAndUpdate(
    id,
    {
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      photos,
      videos,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    project,
  });
});

// Delete Project -- Admin
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander('Project not found', 404));
  }

  // Delete images and videos from Cloudinary
  for (const photo of project.photos) {
    await cloudinary.v2.uploader.destroy(photo.public_id);
  }
  for (const video of project.videos) {
    await cloudinary.v2.uploader.destroy(video.public_id, { resource_type: 'video' });
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project Deleted Successfully',
  });
});
