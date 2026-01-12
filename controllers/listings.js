const Listing = require("../models/listing");
const mbxGeocodig = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocodig({ accessToken: mapToken });
const Booking = require("../models/bookings");




// Search Route
module.exports.search = async (req, res) => {
  const { q, category } = req.query;

  let filter = {};

  // Text search
  if (q && q.trim() !== "") {
    filter.$or = [
      { title: { $regex: q.trim(), $options: "i" } },
      { location: { $regex: q.trim(), $options: "i" } },
      { country: { $regex: q.trim(), $options: "i" } }
    ];
  }

  // Category filter (optional)
  if (category && category !== "All") {
    filter.category = category;
  }

  const listings = await Listing.find(filter);

  // IMPORTANT: variable name used in index.ejs
  res.render("listings/index", { allListings: listings });
}

// Index Route
module.exports.index = async (req, res) => {
  const { category } = req.query;

  let allListings;

  if (category) {
    allListings = await Listing.find({ category });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, category });
};


// New Route
module.exports.newlisting = (req, res) => {
  res.render("listings/new.ejs");
}

// Show Route
module.exports.showlisting = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "listing you are looking for does not exist");
    return res.redirect("/listings");
  }

  // ✅ FETCH BOOKINGS FOR THIS LISTING
  const bookings = await Booking.find({ listing: id });

  // ✅ PREPARE bookedDates ARRAY
  const bookedDates = bookings.map(b => ({
    checkIn: b.checkIn,
    checkOut: b.checkOut
  }));

  // ✅ SEND bookedDates TO EJS
  res.render("listings/show.ejs", {
    listing,
    bookedDates
  });
};


// Create Route
module.exports.createlisting = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send();


  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings"); 

}

// Edit Route
module.exports.editlisting = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you are looking for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_300');
  req.flash("success", "Successfully edited the listing!");
  res.render("listings/edit.ejs", { listing , originalImageUrl});
}

// Update Route
module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  // 👇 RE-GEOCODE LOCATION
  if (req.body.listing.location) {
    const response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    }).send();

    listing.geometry = response.body.features[0].geometry;
  }

  // 👇 IMAGE UPDATE
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();

  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};


// Destroy Route
module.exports.distroylisting = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the listing!");
  console.log(deletedListing);
  res.redirect("/listings");
}

