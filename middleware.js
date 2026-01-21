
const Listing = require("./models/listing");
const Review=require("./models/review");
const {listingSchema}=require("./schema");
const {reviewSchema}=require("./schema");
const ExpressError=require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","User not logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req, res, next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error","Access Denied !!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// fuction for validating listing
module.exports.validateListing=(req, res, next)=>{
    let {error}=listingSchema.validate(req.body);
    
    if(error){
       let errMsg=error.details.map(el=>el.message).join(',');
       throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// function for validating review
module.exports.validateReview=(req, res, next)=>{
    let {error}=reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


module.exports.isAuthor = async(req, res, next)=>{
    let {id, reviewId}=req.params;
    // let listing= await Listing.findById(id, {$pull: {reviews: reviewId}});
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.user._id)){
        req.flash("error","Access Denied !!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}