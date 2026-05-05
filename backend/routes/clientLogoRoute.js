const express = require("express");
const router = express.Router();
const {
  getClientLogos,
  getAllClientLogosAdmin,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo,
  getClientLogo,
  reorderClientLogos,
} = require("../controllers/clientLogoController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/client-logos").get(getClientLogos);

router
  .route("/admin/client-logos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllClientLogosAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createClientLogo);

router.route("/admin/client-logos/reorder").put(isAuthenticatedUser, authorizeRoles("admin"), reorderClientLogos);

router
  .route("/admin/client-logos/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getClientLogo)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateClientLogo)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteClientLogo);

module.exports = router;
