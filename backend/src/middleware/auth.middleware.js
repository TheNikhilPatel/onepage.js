const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    /* 1️⃣ Get token from headers */
    const authHeader = req.headers.authorization;

    /* 2️⃣ Check if token exists */
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    /* 3️⃣ Extract token */
    const token = authHeader.split(" ")[1];

    /* 4️⃣ Verify token */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* 5️⃣ Find user from DB */
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    /* 6️⃣ Attach user to request */
    req.user = user;

    /* 7️⃣ Move to next step (route/controller) */
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

module.exports = authMiddleware;
