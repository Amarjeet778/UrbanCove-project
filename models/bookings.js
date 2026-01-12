const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,

  // ✅ BOOKING STATUS
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked"
  }

}, { timestamps: true });

bookingSchema.virtual("timelineStatus").get(function () {
  const today = new Date();
  today.setHours(0,0,0,0);

  if (this.status === "cancelled") return "Cancelled";
  if (today < this.checkIn) return "Upcoming";
  if (today >= this.checkIn && today <= this.checkOut) return "Checked-In";
  return "Completed";
});

bookingSchema.set("toObject", { virtuals: true });
bookingSchema.set("toJSON", { virtuals: true });


module.exports = mongoose.model("Booking", bookingSchema);
