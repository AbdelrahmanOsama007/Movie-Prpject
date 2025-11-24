const UserService = require("../Services/UserService.js");
const LoginService = require("../Services/LoginService.js");
const ApiError = require("../utils/ApiError.js");
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await UserService.createUser(userData);

    // Convert user to object and remove sensitive fields
    const userObject = user.toObject();
    delete userObject.confirmPassword;

    res
      .status(201)
      .json({ message: "User created successfully", user: userObject });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await LoginService.login(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
};
