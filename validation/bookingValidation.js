const Joi = require('joi');

const createBookingSchema = Joi.object({
  tripId: Joi.number().integer().required().messages({
    'any.required': 'Trip ID is required',
    'number.base': 'Trip ID must be a number',
  })
});

const updateBookingSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED').required().messages({
    'any.only': 'Status must be one of PENDING, CONFIRMED, CANCELLED, COMPLETED',
    'any.required': 'Status is required'
  })
});

module.exports = {
  createBookingSchema,
  updateBookingSchema
};
