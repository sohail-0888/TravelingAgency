const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// -------------------------
// Create a Review
// -------------------------
const createReview = async (req, res) => {
  try {
    const { tripId, rating, comment } = req.body;
    const userId = req.user.id; // JWT se user id le rahe

    // Check if user already reviewed this trip
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_tripId: { userId, tripId },
      },
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this trip' });
    }

    const review = await prisma.review.create({
      data: {
        tripId,
        userId,
        rating,
        comment,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------------
// Get Reviews for a Trip
// -------------------------
const getReviewsByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { tripId: Number(tripId) },
      include: { user: true },
    });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------------
// Delete a Review
// -------------------------
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await prisma.review.findUnique({ where: { id: Number(id) } });

    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Only admin or review owner can delete
    if (req.user.role !== 'ADMIN' && review.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.review.delete({ where: { id: Number(id) } });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReview,
  getReviewsByTrip,
  deleteReview,
};
