const User = require('../models/user');
const ExpressError=require('../utils/ExpressError');

// signup form rendering
module.exports.signup = (req,res)=>{
    res.render("users/signup");
};

// add user to db
module.exports.addUser = async(req,res)=>{
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
};

// login form rendering
module.exports.login = (req,res)=>{
    res.render("users/login");
};

// after login index page rendering with flash message
module.exports.afterLogin = (req, res) => {
    req.flash("success", "Login Successful!");
    // if(res.locals.redirectUrl){
    //     return res.redirect(res.locals.redirectUrl); 
    // }
    // res.redirect("/listings");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// logout
module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User logged out successfully!");
        res.redirect("/listings");
    })
};