const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const CATEGORIES= require("../utils/categories");
const categories=require("../utils/filters");


// index route
module.exports.index = async(req, res) => {
  const filter=req.query.category;
  const dest=req.query.search;
  let q={};

  if(filter){
    q.category = filter;
  }
  if(dest){
     q.$or = [
      { location: { $regex: dest, $options: "i" } },
      { country: { $regex: dest, $options: "i" } },
      { title: { $regex: dest, $options: "i" } }
    ];
  }
    const allListings= await Listing.find(q);
    res.render("listings/index", {allListings,filter,categories,dest});
};


// show specific listing
module.exports.show = async(req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path : 'reviews',  populate:{path : 'author'}}).populate('owner');
    // console.log(listing);
    if(!listing){
        req.flash("error", "List item not found");
        res.redirect("/listings");
    }else{
        res.render("listings/show", {listing});
    }
};


// edit a list item form rendering
module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "List item not found");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;

  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace(
      "/upload/",
      "/upload/c_scale,w_250/"
    );
  }

  res.render("listings/edit", { listing, originalImageUrl, CATEGORIES });
};


// update list item
module.exports.update = async(req, res) => {
        const {id}=req.params;
        const listing= await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});

        if(typeof req.file !== "undefined"){
            let url=req.file.secure_url;
            let filename=req.file.public_id;
            listing.image={url, filename};
        }
        await listing.save();
        req.flash("success", "List item updated successfully!");
        res.redirect(`/listings/${listing._id}`);
};

// create new list item
module.exports.createListing = async(req, res)=>{
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 2
  })
    .send()
    let url=req.file.secure_url;
    let filename=req.file.public_id;    
    const listing = req.body.listing;
    let { category } = listing;
    if (!category) {
      listing.category = [];
    } else if (!Array.isArray(category)) {
      listing.category = [category];
    }

    const newListing = new Listing(listing);
    newListing.geometry= response.body.features[0].geometry;
    newListing.owner=req.user._id;
    newListing.image = {url , filename};
    req.flash("success", "List item created successfully!")
    // console.log(newListing);
    await newListing.save();
    res.redirect(`/listings`);
    // console.log(req.file);
};

// delete listing
module.exports.deleteListing = async(req,res)=>{
        const {id}=req.params;
        // console.log("deleted listing:", delListing.title);
        await Listing.findByIdAndUpdate(id);
        req.flash("success","List item deleted successfully!");
        res.redirect("/listings");
    
};

// render form for new listing
module.exports.newListingForm = (req, res) => {
    // console.log(req.user);
    res.render("listings/new", {CATEGORIES} );
};