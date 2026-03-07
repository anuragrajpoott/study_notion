const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// ================= RESET PASSWORD TOKEN =================
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Email ${email} is not registered`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Click the link below to reset your password:\n\n${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error sending reset password email",
      error: error.message,
    });
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token expired. Please request a new one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};