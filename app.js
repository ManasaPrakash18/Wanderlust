const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const port = 8080;
const ejsMate=require('ejs-mate');
const wrapAsync=require('./utils/wrapAsync')
const ExpressError=require('./utils/ExpressError');
const { listingSchema, reviewSchema }=require('./schema.js');
const Review = require('./models/review');

const validateListing=(req, res, next)=>{
    let {error}=listingSchema.validate(req.body);
    
    if(error){
       let errMsg=error.details.map(el=>el.message).join(',');
       throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

const validateReview=(req, res, next)=>{
    let {error}=reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

app.engine('ejs', ejsMate);

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var methodOverride = require('method-override');
const { read } = require('fs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// home route
app.get('/', (req, res) => {
    res.send('This is the home page');
});

// new listing form route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// show all listings
app.get('/listings', async(req, res) => {
    const allListings= await Listing.find({});
    res.render("listings/index", {allListings});
});


// show specific listing
app.get('/listings/:id', async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id).populate('reviews');
    res.render("listings/show", {listing});
});

// edit listing form route
app.get('/listings/:id/edit', async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit", {listing});
});

// update listing route
app.put('/listings/:id', validateListing, wrapAsync(async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});
    res.redirect(`/listings/${listing._id}`);
}));

// create new listing route
app.post('/listings', validateListing, wrapAsync(async(req, res)=>{
    const newListing = new Listing(req.body.listing);
    // console.log(newListing);
    await newListing.save();
    res.redirect(`/listings`);
}));


// delete listing route
app.delete("/listings/:id", async(req,res)=>{
    const {id}=req.params;
    const delListing= await Listing.findByIdAndDelete(id);
    console.log("deleted listing:", delListing.title);
    res.redirect("/listings");
    
});


//creating review for a listing
app.post('/listings/:id/reviews', validateReview , wrapAsync(async(req, res)=>{
    let listing= await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    await review.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
    console.log("Review added");
}));

// delete review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
    console.log("Review deleted");
}));


// app.get('/listings', async (req, res) => {
//     let sampleList= new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing description.",
        
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     })

//     await sampleList.save();
//     console.log("Sample listing saved to database.");
//     res.send('Sample listing created and saved to database.');
// });


app.all(/(.*)/ , (req, res, next)=>{
    next(new ExpressError(404, 'Page Not found!'));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render('error',{message});
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


