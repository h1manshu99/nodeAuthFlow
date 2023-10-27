const authService = require("../services/authService");

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const { user, token } = await authService.login(username, password);

    // Store user data in the session (if using express-session)
    req.session.user = user;
    res.json({ message: "Login Successful", token: token });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
}

async function registerUser(req, res, next) {
  try {
    const { username, password, email, name, phone } = req.body;

    const user = await authService.registerUser(
      username,
      password,
      email,
      name,
      phone
    );

    // After successful registration, return a success response
    res.status(201).json({ message: "Registration successful", data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  registerUser,
};
