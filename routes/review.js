const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require('../utils/ExpressError');
const wrapAsync=require('../utils/wrapAsync');
const Review = require('../models/review');
const { reviewSchema }=require('../schema.js');
const Listing = require('../models/listing');


// function for validating review
const validateReview=(req, res, next)=>{
    let {error}=reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


//creating review for a listing
router.post('/', validateReview , wrapAsync(async(req, res)=>{
    let listing= await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success","Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
}));

// delete review route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review deleted successfully!");
    res.redirect(`/listings/${id}`);
    console.log("Review deleted");
}));

module.exports=router;