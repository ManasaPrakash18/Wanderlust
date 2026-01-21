const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync');
const {validateReview, isLoggedIn, isAuthor} = require('../middleware.js');

const userController = require("../controllers/review.js");

//creating review for a listing
router.post('/',
    isLoggedIn,
    validateReview , 
    wrapAsync(userController.createReview));

// delete review route
router.delete("/:reviewId", 
    isLoggedIn,
    isAuthor,
    wrapAsync(userController.deleteReview));

module.exports=router;