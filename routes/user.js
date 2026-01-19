const express=require("express");
const router=express.Router();
const ExpressError=require('../utils/ExpressError');
const wrapAsync=require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


// form rendering route
router.get("/signup",(req,res)=>{
    res.render("users/signup");
});

// user adding to db route
router.post("/signup", wrapAsync(async(req,res)=>{
    try{
        let { email, username, password}=req.body;
        const newUser= new User({email, username});
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.flash("success", "User signup successful!");
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

// user login route
router.get("/login", (req,res)=>{
    res.render("users/login");
});

// after user login submition route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", "Login Successful!");
    // if(res.locals.redirectUrl){
    //     return res.redirect(res.locals.redirectUrl); 
    // }
    // res.redirect("/listings");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);

// logout route
router.get("/logout", (req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User logged out successfully!");
        res.redirect("/listings");
    })
})


module.exports=router;