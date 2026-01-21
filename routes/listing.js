const express=require("express");
const router= express.Router();
const wrapAsync=require('../utils/wrapAsync');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const { populate } = require("../models/user.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });



// new listing form route
router.get("/new", 
    isLoggedIn, 
    listingController.newListingForm);


router.route("/")
    // show all listings
    .get( wrapAsync(listingController.index) )
    
    // create new listing route
    .post( 
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.createListing));



router.route("/:id")
    // show specific listing
    .get(wrapAsync(listingController.show))
    
    // update listing route
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.update))
    
        // delete listing route
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));



// edit listing form route
router.get('/:id/edit', 
    isLoggedIn,  
    isOwner,
    wrapAsync(listingController.editListing));


module.exports=router;