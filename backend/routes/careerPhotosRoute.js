const express = require("express");
const router = express.Router();
const {
  getAllCareerPhotos,
  getAllCareerPhotosAdmin,
  createCareerPhoto,
  updateCareerPhoto,
  deleteCareerPhoto,
  getCareerPhoto,
  reorderCareerPhotos,
} = require("../controllers/careerPhotosController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/career-photos").get(getAllCareerPhotos);

// Admin routes
router
  .route("/admin/career-photos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllCareerPhotosAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCareerPhoto);

router.route("/admin/career-photos/reorder").put(isAuthenticatedUser, authorizeRoles("admin"), reorderCareerPhotos);

router
  .route("/admin/career-photos/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCareerPhoto)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCareerPhoto)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCareerPhoto);

module.exports = router;
