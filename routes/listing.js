const express=require("express");
const router= express.Router();
const ExpressError=require('../utils/ExpressError');
const Listing = require('../models/listing');
const wrapAsync=require('../utils/wrapAsync');
const { listingSchema }=require('../schema.js');


// fuction for validating listing
const validateListing=(req, res, next)=>{
    let {error}=listingSchema.validate(req.body);
    
    if(error){
       let errMsg=error.details.map(el=>el.message).join(',');
       throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}



// new listing form route
router.get("/new", (req, res) => {
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
    const listing=await Listing.findById(id).populate('reviews');
    if(!listing){
        req.flash("error", "List item not found");
        res.redirect("/listings");
    }else{
        res.render("listings/show", {listing});
    }
});

// edit listing form route
router.get('/:id/edit', async(req, res) => {
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
router.put('/:id', validateListing, wrapAsync(async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});
    req.flash("success", "List item updated successfully!");
    res.redirect(`/listings/${listing._id}`);
}));

// create new listing route
router.post('/', validateListing, wrapAsync(async(req, res)=>{
    const newListing = new Listing(req.body.listing);
    req.flash("success", "List item created successfully!")
    // console.log(newListing);
    await newListing.save();
    res.redirect(`/listings`);
}));


// delete listing route
router.delete("/:id", async(req,res)=>{
    const {id}=req.params;
    const delListing= await Listing.findByIdAndDelete(id);
    console.log("deleted listing:", delListing.title);
    req.flash("success","List item deleted successfully!");
    res.redirect("/listings");
    
});


module.exports=router;