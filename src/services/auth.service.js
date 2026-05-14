const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    username: data.username,

    email: data.email,

    password: hashedPassword,
  });
};

module.exports = {
  register,
};
