const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync');
const Review = require('../models/review');
const Listing = require('../models/listing');
const {validateReview, isLoggedIn, isAuthor} = require('../middleware.js');

//creating review for a listing
router.post('/',
    isLoggedIn,
    validateReview , 
    wrapAsync(async(req, res)=>{
        const listing = await Listing.findById(req.params.id).populate({path: "reviews", populate: { path: "author" }}).populate("owner");
        let review = new Review(req.body.review);
        review.author=req.user._id;
        // console.log(review);
        listing.reviews.push(review);

        await review.save();
        await listing.save();

        req.flash("success","Review added successfully!");
        res.redirect(`/listings/${listing._id}`);
}));

// delete review route
router.delete("/:reviewId", 
    isLoggedIn,
    isAuthor,
    wrapAsync(async(req,res)=>{
        let {id, reviewId}=req.params;
        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review deleted successfully!");
        res.redirect(`/listings/${id}`);
        console.log("Review deleted");
}));

module.exports=router;