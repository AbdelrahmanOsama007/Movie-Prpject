const User = require("../Models/Users.js");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError("Invalid password", 401);
  }
  const token = jwt.sign(
    { username: user.name, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );
  return { user, token };
};
module.exports = {
  login,
};
