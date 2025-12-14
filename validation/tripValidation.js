const Joi = require('joi');

const createTripSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required'
  }),
  slug: Joi.string().required().messages({
    'string.empty': 'Slug is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date must be valid',
    'any.required': 'Start date is required'
  }),
  endDate: Joi.date().required().messages({
    'date.base': 'End date must be valid',
    'any.required': 'End date is required'
  }),
  seatsAvailable: Joi.number().integer().required().messages({
    'number.base': 'Seats available must be a number',
    'any.required': 'Seats available is required'
  })
});

const updateTripSchema = Joi.object({
  title: Joi.string(),
  slug: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  seatsAvailable: Joi.number().integer()
});

module.exports = {
  createTripSchema,
  updateTripSchema
};
