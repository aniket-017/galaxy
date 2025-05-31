const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const Project = require("../models/Project");

// Get all projects
router.get("/projects", projectController.getAllProjects);

// Get projects by category
router.get("/projects/category/:category", projectController.getProjectsByCategory);

// Get projects by category and subcategory
router.get(
  "/projects/category/:category/subcategory/:subcategory",
  projectController.getProjectsByCategoryAndSubcategory
);

// Get single project
router.get("/project/:id", projectController.getProjectDetails);

// Create new project
router.post("/project/new", authenticateToken, projectController.createProject);

// Update project
router.put("/project/:id", authenticateToken, projectController.updateProject);

// Delete project
router.delete("/project/:id", authenticateToken, projectController.deleteProject);

// Search projects
router.get("/projects/search", projectController.searchProjects);

module.exports = router;
