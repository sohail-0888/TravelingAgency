const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // Pakistan aur international format
    .required(),
  address: Joi.string().min(5).max(200).required(),
  cnic: Joi.string()
    .pattern(/^[0-9]{5}-[0-9]{7}-[0-9]$/) // Pakistani CNIC format: 12345-1234567-1
    .required(),
  postalCode: Joi.string().min(4).max(10).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


module.exports = { registerSchema,loginSchema};
