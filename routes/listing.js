const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn}= require("../middleware.js");
const {isLoggedIn1}= require("../middleware.js");
const {isOwner}= require("../middleware.js");
const {validateListing}= require("../middleware.js");
const listingController= require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});


router.route("/")
.get(isLoggedIn1,wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.create));

//NEW Route
router.get("/new",isLoggedIn,wrapAsync(listingController.new));
  
router.route("/:id")
.get(isLoggedIn,wrapAsync(listingController.show))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.update))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.delete));


//EDIT Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.edit));

module.exports= router; 
