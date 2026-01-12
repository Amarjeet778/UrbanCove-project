const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); 
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

const Listcontroller = require("../controllers/listings.js");

router.route('/search')
.get(wrapAsync(Listcontroller.search));

// Index and Create Route
router.route('/')
.get(wrapAsync(Listcontroller.index))
.post(isLoggedIn, validateListing, upload.single('listing[image]'),
  wrapAsync(Listcontroller.createlisting)
);

//New Route
router.get("/new",isLoggedIn, Listcontroller.newlisting);

//update and delete routes

router.route("/:id")
.get( wrapAsync(Listcontroller.showlisting))
.put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing,
  wrapAsync(Listcontroller.updatelisting))
  .delete(isLoggedIn, isOwner,wrapAsync(Listcontroller.distroylisting));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(Listcontroller.editlisting));

module.exports = router;