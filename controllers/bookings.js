const Booking = require("../models/bookings.js");
const Listing = require("../models/listing.js");

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut } = req.body.booking;
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (end <= start) {
    req.flash("error", "Check-out must be after check-in");
    return res.redirect(`/listings/${id}`);
  }

  // 🔴 CHECK DATE OVERLAP
  const conflict = await Booking.findOne({
    listing: id,
    status: "booked",
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) }
  });

  if (conflict) {
    req.flash("error", "Selected dates are already booked!");
    return res.redirect(`/listings/${id}`);
  }

  const listing = await Listing.findById(id);
  const days =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn,
    checkOut,
    totalPrice: days * listing.price
  });
  

  await booking.save();

  req.flash("success", "Booking confirmed!");
  res.redirect("/bookings");
};

module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("bookings/index", { bookings });
};
module.exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today >= booking.checkIn) {
    req.flash("error", "You cannot cancel after check-in date");
    return res.redirect("/bookings");
  }

  booking.status = "cancelled";
  await booking.save();

  req.flash("success", "Booking cancelled successfully");
  res.redirect("/bookings");
};


