const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users_controller');

const { checkAuthentication } = require('../config/passport-local-Strategy');
// url:localhost:8000/users/sign-up
router.get('/sign-up',passport.notAuthenticated,usersController.signUp);
// url:localhost:8000/users/sign-in
router.get('/sign-in',passport.notAuthenticated,usersController.signIn);
// url:localhost:8000/users/create
router.post('/create',usersController.create);
// url:localhost:8000/users/sign-in
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}),usersController.createSession);



module.exports=router;
