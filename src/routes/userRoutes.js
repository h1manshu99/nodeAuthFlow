const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateSession = require("../middleware/authenticateSession"); // Middleware for session authentication
const authenticateUser = require("../middleware/authenticateUser");

// Define routes
router.get(
  "/",
  authenticateSession,
  authenticateUser.authenticateReq,
  userController.getAllUsers
);
router.get(
  "/:id",
  authenticateSession,
  authenticateUser.authenticateReq,
  userController.getUserById
);

router.put(
  "/:id",
  authenticateSession,
  authenticateUser.authenticateReq,
  userController.updateUser
);
router.delete(
  "/:id",
  authenticateSession,
  authenticateUser.authenticateReq,
  userController.deleteUser
);

module.exports = router;
