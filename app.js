const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = 8080;
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const session=require("express-session");
const flash=require("connect-flash");


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
    saveUninitialized:true
};

app.use(session(sessionOptions));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.failure=req.flash("failure");
    next();
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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


