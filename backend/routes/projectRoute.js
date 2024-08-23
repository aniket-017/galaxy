const express = require('express');
const { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getProjectDetails 
} = require('../controllers/projectController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/projects').get(getAllProjects);
router.route('/project/new').post(createProject);
// router.route('/project/new').post(isAuthenticatedUser, createProject);
router.route('/project/:id').delete(deleteProject);
router.route('/project/:id').put(updateProject);
router.route('/project/:id').get(getProjectDetails);

module.exports = router;

 