const express = require('express');
const router = express.Router();
const {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');

const { protect, admin } = require('../middlewares/authmiddleware');
const validate = require("../middlewares/validatemiddleware");
const { createTripSchema, updateTripSchema } = require("../validation/tripValidation");
// Routes
router.post('/Ctrip', protect, admin,validate(createTripSchema), createTrip);      // Admin create
router.get('/gtrip', getAllTrips);                      // Everyone can view
router.get('/:id', getTripById);                   // Everyone can view
router.put('/:id', protect, admin, validate(updateTripSchema),updateTrip);    // Admin update
router.delete('/:id', protect, admin, deleteTrip); // Admin delete

module.exports = router;
