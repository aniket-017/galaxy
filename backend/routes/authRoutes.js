const express = require("express");
const router = express.Router();
const { loginUser, getMe, registerUser } = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticatedUser, getMe);

module.exports = router;
