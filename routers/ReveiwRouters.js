const express = require('express');
const router = express.Router();

const { createReview, getReviewsByTrip, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middlewares/authmiddleware');

// Create a review (protected, any logged in user)
router.post('/cR', protect, createReview);

// Get reviews by trip (public)
router.get('/trip/:tripId', getReviewsByTrip);

// Delete a review (protected)
router.delete('/:id', protect, deleteReview);

module.exports = router;
