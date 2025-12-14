const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
 
} = require('../controllers/authController');

const {getAllUsers,getUserById,updateUser,deleteUser}  = require('../controllers/userController')

const { protect, admin } = require('../middlewares/authmiddleware');
const { registerSchema, loginSchema } = require('../validation/authvalidation');
const validate = require('../middlewares/validatemiddleware');

// Public
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

// Admin-only routes
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
