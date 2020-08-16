// Import Express Router Passport 
const express=require('express');
const router=express.Router();
const passport=require('passport');
// Home Controller Loaded
const homeController=require('../controllers/home_controller');
console.log('Well!! Router Is Loaded');

// url:localhost:8000/users
router.use('/users',require('./users'));

// home function called for url 
router.get('/',passport.setAuthenticatedUser,homeController.home);


module.exports=router;