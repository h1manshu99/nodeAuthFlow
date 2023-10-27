const User = require("../models/User");
const bcrypt = require("bcrypt");
const authenticateUser = require("../middleware/authenticateUser");
const AppError = require("../utils/AppError");

async function login(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new AppError("user_not_found", "User Doesnot Exists", 400);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("authentication_error", "Invalid password", 400);
    }

    const token = await authenticateUser.generateToken(user);
    return { user, token };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError("login_error", err, 500);
  }
}

async function registerUser(username, password, email, name, phone) {
  try {
    const user = new User({
      username,
      password,
      email,
      name,
      phone,
    });

    const newUser = await user.save();

    return newUser;
  } catch (error) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError("registration_error", err, 500);
  }
}

module.exports = {
  login,
  registerUser,
};
