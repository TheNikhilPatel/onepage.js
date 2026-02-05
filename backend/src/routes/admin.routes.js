const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

/* ---------- Admin Only Route ---------- */
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin 👑",
      admin: req.user,
    });
  }
);

module.exports = router;
