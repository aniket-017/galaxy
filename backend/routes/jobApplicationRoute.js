const express = require("express");
const router = express.Router();
const {
  submitJobApplication,
  getAllJobApplications,
  getJobApplication,
  updateJobApplicationStatus,
  deleteJobApplication,
  getApplicationStats,
} = require("../controllers/jobApplicationController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/job-application").post(submitJobApplication);

// Admin routes
router.route("/admin/job-applications").get(isAuthenticatedUser, authorizeRoles("admin"), getAllJobApplications);

router.route("/admin/job-applications/stats").get(isAuthenticatedUser, authorizeRoles("admin"), getApplicationStats);

router
  .route("/admin/job-applications/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getJobApplication)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateJobApplicationStatus)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteJobApplication);

module.exports = router;
