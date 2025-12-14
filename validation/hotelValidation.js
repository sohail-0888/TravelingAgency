const Joi = require('joi');

const createHotelSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  slug: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  location: Joi.string().min(3).required(),
  pricePerNight: Joi.number().min(0).required(),
  roomsAvailable: Joi.number().min(1).required(),
  amenities: Joi.array().items(Joi.string()).required()
});

const updateHotelSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  slug: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  location: Joi.string().min(3),
  pricePerNight: Joi.number().min(0),
  roomsAvailable: Joi.number().min(1),
  amenities: Joi.array().items(Joi.string())
});

module.exports = { createHotelSchema, updateHotelSchema };
