const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= AUTH MIDDLEWARE =================
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Error validating token",
    });
  }
};

// ================= ROLE CHECK HELPERS =================
const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });

      if (!user || user.accountType !== role) {
        return res.status(403).json({
          success: false,
          message: `This route is restricted to ${role}s`,
        });
      }

      next();
    } catch (error) {
      console.error("Role verification error:", error);
      return res.status(500).json({
        success: false,
        message: "User role verification failed",
      });
    }
  };
};

// ================= ROLE MIDDLEWARE =================
exports.isStudent = checkRole("Student");
exports.isAdmin = checkRole("Admin");
exports.isInstructor = checkRole("Instructor");