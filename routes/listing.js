const express=require("express");
const router= express.Router();
const Listing = require('../models/listing');
const wrapAsync=require('../utils/wrapAsync');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const { populate } = require("../models/user.js");



// new listing form route
router.get("/new", 
    isLoggedIn, 
    (req, res) => {
    // console.log(req.user);
    res.render("listings/new");
});

// show all listings
router.get('', async(req, res) => {
    const allListings= await Listing.find({});
    res.render("listings/index", {allListings});
});


// show specific listing
router.get('/:id', async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path : 'reviews',  populate:{path : 'author'}}).populate('owner');
    // console.log(listing);
    if(!listing){
        req.flash("error", "List item not found");
        res.redirect("/listings");
    }else{
        res.render("listings/show", {listing});
    }
});

// edit listing form route
router.get('/:id/edit', 
    isLoggedIn,  
    isOwner,
    async(req, res) => {
        const {id}=req.params;
        const listing=await Listing.findById(id);
        if(!listing){
            req.flash("error", "List item not found");
            res.redirect("/listings");
        }else{
            res.render("listings/edit", {listing});
        }
});

// update listing route
router.put(
    '/:id',
    isLoggedIn,
    isOwner,
    validateListing, 
    wrapAsync(async(req, res) => {
        const {id}=req.params;
        const listing= await Listing.findById(id);
        await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});
        req.flash("success", "List item updated successfully!");
        res.redirect(`/listings/${listing._id}`);
}));

// create new listing route
router.post('/',
    isLoggedIn,
    validateListing, 
    wrapAsync(async(req, res)=>{
        const newListing = new Listing(req.body.listing);
        newListing.owner=req.user._id;
        req.flash("success", "List item created successfully!")
        // console.log(newListing);
        await newListing.save();
        res.redirect(`/listings`);
}));


// delete listing route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    async(req,res)=>{
        const {id}=req.params;
        // console.log("deleted listing:", delListing.title);
        await listing.findByIdAndUpdate(id);
        req.flash("success","List item deleted successfully!");
        res.redirect("/listings");
    
});


module.exports=router;