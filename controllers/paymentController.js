const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a payment for a booking
const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    // Validate booking existence
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        paymentMethod
      }
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all payments (Admin only)
const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { booking: true }
    });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update payment status (Admin)
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    const payment = await prisma.payment.update({
      where: { id: parseInt(paymentId) },
      data: { status }
    });

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPayment, getPayments, updatePaymentStatus };
