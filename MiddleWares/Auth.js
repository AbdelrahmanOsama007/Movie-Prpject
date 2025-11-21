const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError.js");


const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ApiError("No token provided", 401));
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return next(new ApiError("Invalid token format", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret",(err,decoded)=>{

    });
    req.user = decoded;
    next();
  } catch (error) {
   throw new ApiError("Authentication failed", 401);
  }
};

// Admin-only middleware
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ApiError("Admin access required", 403));
  }
  next();
};

module.exports = { auth, adminAuth };
