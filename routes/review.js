const express = require("express");
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require('../utils/ExpressError.js');
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview}= require("../middleware.js");
const {isLoggedIn}= require("../middleware.js");
const {isAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");


//POST Reviews Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.new));

//DELETE Reviews Route 
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.delete));

module.exports= router; 
