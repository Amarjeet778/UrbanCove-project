const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/bookings");

// create booking
router.post("/listings/:id/book", isLoggedIn, bookingController.createBooking);

// my bookings
router.get("/bookings", isLoggedIn, bookingController.myBookings);

// cancel booking
router.post("/bookings/:id/cancel", isLoggedIn, bookingController.cancelBooking);

module.exports = router;
