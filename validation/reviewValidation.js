const Joi = require('joi');

const createReviewSchema = Joi.object({
  tripId: Joi.number().integer().required().messages({
    'number.base': 'Trip ID must be a number',
    'any.required': 'Trip ID is required'
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating cannot be more than 5',
    'any.required': 'Rating is required'
  }),
  comment: Joi.string().allow('').optional()
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().allow('')
});

module.exports = {
  createReviewSchema,
  updateReviewSchema
};
