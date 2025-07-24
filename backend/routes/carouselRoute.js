const express = require("express");
const router = express.Router();
const {
  getAllCarouselSlides,
  getAllCarouselSlidesAdmin,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
  getCarouselSlide,
  reorderCarouselSlides,
} = require("../controllers/carouselController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/carousel").get(getAllCarouselSlides);

// Admin routes
router
  .route("/admin/carousel")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllCarouselSlidesAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCarouselSlide);

router.route("/admin/carousel/reorder").put(isAuthenticatedUser, authorizeRoles("admin"), reorderCarouselSlides);

router
  .route("/admin/carousel/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCarouselSlide)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCarouselSlide)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCarouselSlide);

module.exports = router;

 