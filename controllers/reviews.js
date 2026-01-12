const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createreview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  newreview.author = req.user._id;
  console.log(req.user);
  listing.reviews.push(newreview);
  await newreview.save();
  await listing.save();
  req.flash("success", "Successfully added a new review!");
  res.redirect(`/listings/${listing._id}`);
}

module.exports.destoryReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);
}