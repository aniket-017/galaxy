const express = require("express");
const router = express.Router();
const {
  getAllLeadership,
  getAllLeadershipAdmin,
  createLeadership,
  updateLeadership,
  deleteLeadership,
  getLeadership,
  getLeadershipByRole,
} = require("../controllers/leadershipController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/leadership").get(getAllLeadership);
router.route("/leadership/:role").get(getLeadershipByRole);

// Admin routes
router
  .route("/admin/leadership")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllLeadershipAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createLeadership);

router
  .route("/admin/leadership/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getLeadership)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateLeadership)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLeadership);

module.exports = router;
