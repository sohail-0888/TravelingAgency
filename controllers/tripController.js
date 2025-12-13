const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// -------------------------
// Create a new Trip (Admin)
// -------------------------
const createTrip = async (req, res) => {
  try {
    const { title, description, price, startDate, endDate, seatsAvailable } = req.body;

    if (!title || !description || !price || !startDate || !endDate || !seatsAvailable) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        description,
        price,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        seatsAvailable,
        createdById: req.user.id // admin id from authMiddleware
      }
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------
// Get All Trips (Customer/Admin)
// -------------------------
const getAllTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: { createdBy: { select: { id: true, name: true } } }
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------
// Get Trip By ID
// -------------------------
const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(id) },
      include: { createdBy: { select: { id: true, name: true } } }
    });

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------
// Update Trip (Admin Only)
// -------------------------
const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, startDate, endDate, seatsAvailable } = req.body;

    const trip = await prisma.trip.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug: title ? title.toLowerCase().replace(/\s+/g, '-') : undefined,
        description,
        price,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        seatsAvailable
      }
    });

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------
// Delete Trip (Admin Only)
// -------------------------
const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.trip.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip
};
