const express=require('express');
const router=express.Router();
// Home Controller Loaded
const homeController=require('../controllers/home_controller');

console.log('Well!! Router Is Loaded');

// url:localhost:8000/users
router.use('/users',require('./users'));

// home function called for url 
router.get('/',homeController.home);


module.exports=router;