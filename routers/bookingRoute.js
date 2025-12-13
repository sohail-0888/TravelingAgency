const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");

const { protect } = require("../middlewares/authmiddleware");

// -------------------------
// User routes
// -------------------------
router.post("/cbook", protect, createBooking);
router.get("/gbook", protect, getBookings);
router.put("/cancel/:id", protect, cancelBooking);

// -------------------------
// Admin route
// -------------------------
router.put("/status/:id", protect, updateBookingStatus);

module.exports = router;
