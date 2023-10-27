const UserService = require("../services/userService");
const AppError = require("../utils/AppError");

async function getAllUsers(req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
    // res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res, next) {
  const userId = req.params.id;
  try {
    const user = await UserService.getUserById(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { user } = req.session;

    // Ensure that the user is trying to update their own data
    if (id !== user._id.toString()) {
      throw new AppError("INVALID_USER", "FOrbidden", 403);
    }

    // Implement the update user logic here, using the id and request body data
    const updatedUser = await UserService.updateUser(id, req.body);

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const { user } = req.session;

    // Ensure that the user is trying to delete their own data
    if (id !== user._id.toString()) {
      throw new AppError("INVALID_USER", "Forbidden", 401);
    }

    // Implement the delete user logic here, using the id
    const deletedUser = await UserService.deleteUser(id);

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
