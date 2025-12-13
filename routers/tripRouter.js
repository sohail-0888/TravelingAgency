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

// Routes
router.post('/Ctrip', protect, admin, createTrip);      // Admin create
router.get('/gtrip', getAllTrips);                      // Everyone can view
router.get('/:id', getTripById);                   // Everyone can view
router.put('/:id', protect, admin, updateTrip);    // Admin update
router.delete('/:id', protect, admin, deleteTrip); // Admin delete

module.exports = router;
