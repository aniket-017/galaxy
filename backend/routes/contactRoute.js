const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getAllContactsAdmin,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contactController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/contact").get(getAllContacts);

// Admin routes
router
  .route("/admin/contact")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllContactsAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createContact);

router
  .route("/admin/contact/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getContact)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateContact)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContact);

module.exports = router;

