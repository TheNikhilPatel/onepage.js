const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* ---------- Register User ---------- */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* 1️⃣ Check if all fields exist */
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* 2️⃣ Check if user already exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    /* 3️⃣ Hash password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* 4️⃣ Create user */
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    /* 5️⃣ Send response */
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------- Login User ---------- */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 5️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------- Forgot Password ---------- */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3️⃣ Generate reset token (random string)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 4️⃣ Hash token before saving (security)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 5️⃣ Save token & expiry in DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // 6️⃣ Send response (later: email this token)
    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken, // ⚠️ for testing only
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------- Reset Password ---------- */
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 1️⃣ Validate input
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // 2️⃣ Hash token from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 3️⃣ Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    // 4️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Update password & clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
