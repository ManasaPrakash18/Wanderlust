const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = 8080;
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');

const User=require("./models/user.js");

const session=require("express-session");
const flash=require("connect-flash");

const passport= require("passport");
const LocalStratergy=require("passport-local").Strategy;

// requiring routes
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


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


// sessions
const sessionOptions={
    secret:"secret", 
    resave:false, 
    saveUninitialized:true,
    cookie:{
        exprires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

// using routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// home route
app.get('/', (req, res) => {
    res.send('This is the home page');
});


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


