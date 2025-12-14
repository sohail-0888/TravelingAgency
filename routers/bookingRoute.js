const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");

const { protect } = require("../middlewares/authmiddleware");

const validate = require("../middlewares/validatemiddleware");
const { createBookingSchema, updateBookingSchema } = require("../validation/bookingValidation");

// -------------------------
// User routes
// -------------------------
router.post("/cbook", protect, validate(createBookingSchema), createBooking);
router.get("/gbook", protect, getBookings);
router.put("/cancel/:id", protect, cancelBooking);

// -------------------------
// Admin route
router.put("/status/:id", protect, validate(updateBookingSchema), updateBookingStatus);

module.exports = router;
