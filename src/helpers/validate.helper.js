const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

const contactSchema = Joi.object({
  fullname: Joi.string().required(),

  phone: Joi.string().required(),

  email: Joi.string().email().allow(""),

  address: Joi.string().allow(""),
});

module.exports = {
  registerSchema,
  loginSchema,
  contactSchema,
};
