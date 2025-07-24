const express = require("express");
const router = express.Router();
const {
  getAllTeamMembers,
  getAllTeamMembersAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMember,
  reorderTeamMembers,
} = require("../controllers/teamController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/team").get(getAllTeamMembers);

// Admin routes
router
  .route("/admin/team")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllTeamMembersAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createTeamMember);

router.route("/admin/team/reorder").put(isAuthenticatedUser, authorizeRoles("admin"), reorderTeamMembers);

router
  .route("/admin/team/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getTeamMember)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTeamMember)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTeamMember);

module.exports = router;
