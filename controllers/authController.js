const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------- REGISTER -----------------
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    next(err);
  }
};

// --------------- LOGIN -----------------
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    next(err);
  }
};

// --------------- GET ALL USERS (Admin) -----------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, isActive: true } });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// --------------- GET USER BY ID (Admin) -----------------
const getUserById = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: parseInt(req.params.id) }, 
      select: { id: true, name: true, email: true, role: true, isActive: true } 
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// --------------- UPDATE USER (Admin) -----------------
const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email, role, isActive }
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// --------------- DELETE USER (Admin) -----------------
const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
