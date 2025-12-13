const express = require('express');
const router = express.Router();
const { createPayment, getPayments, updatePaymentStatus } = require('../controllers/paymentController');
const { protect, admin } = require('../middlewares/authmiddleware');

// Customer creates payment
router.post('/cP', protect, createPayment);

// Admin gets all payments
router.get('/gP', protect, admin, getPayments);

// Admin updates payment status
router.put('/:paymentId', protect, admin, updatePaymentStatus);

module.exports = router;
