const User = require("../models/User"); // Import your user model here
const AppError = require("../utils/AppError");

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new AppError(
      "DATABASE_ERROR",
      "Failed to fetch users",
      500,
      error.message
    );
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("USER_NOT_FOUND", "User not found", 404);
    }
    return user;
  } catch (error) {
    throw new AppError(
      "DATABASE_ERROR",
      "Failed to fetch user",
      500,
      error.message
    );
  }
}

async function updateUser(id, data) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      throw new AppError("USER_NOT_FOUND", "User not found", 404);
    }

    return updatedUser;
  } catch (error) {
    throw new AppError(
      "DATABASE_ERROR",
      "USER_UPDATE_ERROR",
      error.message,
      500
    );
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      throw new AppError("USER_NOT_FOUND", "User not found", 404);
    }

    return deletedUser;
  } catch (error) {
    throw new AppError("USER_DELETE_ERROR", error.message, 500);
  }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
