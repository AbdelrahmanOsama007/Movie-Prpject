const User = require("../Models/Users.js");
const ApiError = require("../utils/ApiError.js");
const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError("Email already exists", 409);
  }

  const { confirmPassword, ...userDataToSave } = userData;

    const user = await User.create(userDataToSave);
    return user;
  
};
module.exports = {
  createUser,
};
