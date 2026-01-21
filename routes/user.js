const express=require("express");
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/user");



router.route("/signup")
// signup form rendering routetroller.signup);
  .get( userController.signup)
  // user adding to db route
  .post( userController.addUser);




router.route("/login")
  // user login route
  .get(userController.login)

  // after user login submition route
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    userController.afterLogin
  );



// logout route
router.get("/logout", userController.logout)


module.exports=router;