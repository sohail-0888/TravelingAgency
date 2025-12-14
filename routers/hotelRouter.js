const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authmiddleware');
const validate = require('../middlewares/validatemiddleware');
const { createHotelSchema, updateHotelSchema } = require('../validation/hotelValidation');
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');

// Public routes
router.get('/', getHotels);
router.get('/:id', getHotelById);

// Admin-only routes
router.post('/', protect, admin, validate(createHotelSchema), createHotel);
router.put('/:id', protect, admin, validate(updateHotelSchema), updateHotel);
router.delete('/:id', protect, admin, deleteHotel);

module.exports = router;
