const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

/* ---------- Protected Profile (ALL users) ---------- */
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: req.user,
  });
});

/* ---------- Admin Only Route ---------- */
router.get(
  "/admin/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin 🚀",
    });
  }
);

module.exports = router;
