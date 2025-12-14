const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// -------------------------
// Create Hotel (Admin)
// -------------------------
const createHotel = async (req, res, next) => {
  try {
    const { name, slug, description, location, pricePerNight, roomsAvailable, amenities } = req.body;

    const existingHotel = await prisma.hotel.findUnique({ where: { slug } });
    if (existingHotel) return res.status(400).json({ message: 'Hotel with this slug already exists.' });

    const hotel = await prisma.hotel.create({
      data: { name, slug, description, location, pricePerNight, roomsAvailable, amenities }
    });

    res.status(201).json(hotel);
  } catch (err) {
    next(err);
  }
};

// -------------------------
// Get All Hotels
// -------------------------
const getHotels = async (req, res, next) => {
  try {
    const hotels = await prisma.hotel.findMany();
    res.json(hotels);
  } catch (err) {
    next(err);
  }
};

// -------------------------
// Get Hotel by ID
// -------------------------
const getHotelById = async (req, res, next) => {
  try {
    const hotel = await prisma.hotel.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found.' });
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

// -------------------------
// Update Hotel (Admin)
// -------------------------
const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotel = await prisma.hotel.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

// -------------------------
// Delete Hotel (Admin)
// -------------------------
const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.hotel.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Hotel deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createHotel, getHotels, getHotelById, updateHotel, deleteHotel };
