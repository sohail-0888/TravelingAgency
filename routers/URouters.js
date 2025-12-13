const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { protect, admin } = require('../middlewares/authmiddleware');

// -------------------------
// Routes
// -------------------------

// Get all users - Admin only
router.get('/gUser', protect, admin, getAllUsers);

// Get single user - Protected
router.get('/:id', protect, getUserById);

// Update user profile - Protected
router.put('/:id', protect, updateUser);

// Delete user - Admin only
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
