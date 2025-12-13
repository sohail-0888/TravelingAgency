const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// -------------------------
// Create Booking (User only)
// -------------------------
const createBooking = async (req, res) => {
  try {
    const { tripId } = req.body;

    // Check if trip exists
    const trip = await prisma.trip.findUnique({ where: { id: parseInt(tripId) } });
    if (!trip) return res.status(404).json({ message: "Trip not found." });

    // Check seats available
    if (trip.seatsAvailable <= 0) return res.status(400).json({ message: "No seats available." });

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        tripId: trip.id,
      }
    });

    // Reduce available seats
    await prisma.trip.update({
      where: { id: trip.id },
      data: { seatsAvailable: trip.seatsAvailable - 1 }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking." });
  }
};

// -------------------------
// Get All Bookings (Admin) or User's Bookings
// -------------------------
const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "ADMIN") {
      bookings = await prisma.booking.findMany({ include: { trip: true, user: true } });
    } else {
      bookings = await prisma.booking.findMany({
        where: { userId: req.user.id },
        include: { trip: true }
      });
    }
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

// -------------------------
// Update Booking Status (Admin only)
// -------------------------
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking." });
  }
};

// -------------------------
// Cancel Booking (User)
// -------------------------
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id: parseInt(id) } });
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    if (req.user.role !== "ADMIN" && booking.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }

    const canceledBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: "CANCELLED" }
    });

    // Increase trip seats
    await prisma.trip.update({
      where: { id: booking.tripId },
      data: { seatsAvailable: { increment: 1 } }
    });

    res.json(canceledBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel booking." });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  cancelBooking
};
