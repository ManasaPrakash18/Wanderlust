const Listing = require("../models/listing");
const Review = require("../models/review");

// create new review
module.exports.createReview = async(req, res)=>{
        const listing = await Listing.findById(req.params.id).populate({path: "reviews", populate: { path: "author" }}).populate("owner");
        let review = new Review(req.body.review);
        review.author=req.user._id;
        // console.log(review);
        listing.reviews.push(review);

        await review.save();
        await listing.save();

        req.flash("success","Review added successfully!");
        res.redirect(`/listings/${listing._id}`);
};

// delete review
module.exports.deleteReview = async(req,res)=>{
        let {id, reviewId}=req.params;
        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review deleted successfully!");
        res.redirect(`/listings/${id}`);
        console.log("Review deleted");
};