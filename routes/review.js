const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const Reviewcontroller = require("../controllers/reviews.js");
// Create Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(Reviewcontroller.createreview));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(Reviewcontroller.destoryReview));
module.exports = router;