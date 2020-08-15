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
// url:localhost:8000/users/destroySession
router.get('/destroy-session',passport.checkAuthentication,usersController.destroySession);
// url:localhost:8000/users/forget
router.get('/forget',passport.notAuthenticated,usersController.forgetPassword)
// url:localhost:8000/users/reset
router.post('/reset',passport.notAuthenticated,usersController.emailReset)
module.exports=router;
