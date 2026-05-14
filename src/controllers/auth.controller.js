const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const authService = require("../services/auth.service");

const { generateToken } = require("../helpers/jwt.helper");

const { registerSchema, loginSchema } = require("../helpers/validate.helper");

const showRegister = (req, res) => {
  res.render("auth/register", {
    error: null,
  });
};

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.render("auth/register", {
      error: error.details[0].message,
    });
  }

  const existed = await User.findOne({
    email: req.body.email,
  });

  if (existed) {
    return res.render("auth/register", {
      error: "Email already exists",
    });
  }

  await authService.register(req.body);

  res.redirect("/login");
};

const showLogin = (req, res) => {
  res.render("auth/login", {
    error: null,
  });
};
const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.render("auth/login", {
      error: error.details[0].message,
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.render("auth/login", {
      error: "Email does not exist",
    });
  }

  const isMatch = await bcrypt.compare(
    req.body.password,

    user.password,
  );

  if (!isMatch) {
    return res.render("auth/login", {
      error: "Wrong password",
    });
  }

  const token = generateToken(user);

  res.cookie("token", token);

  res.redirect("/contacts");
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.redirect("/login");
};

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  logout,
};
