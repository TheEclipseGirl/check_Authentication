const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');
const bcrypt=require('bcrypt');
passport.use(new googleStrategy({
    clientID:'Give Your Client ID',
    clientSecret:'Give your Secret Key',
    callbackURL:'http://localhost:8000/users/auth/google/callback'

},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('Error in google-strategy-passport');
            return;
        }

        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            let pass=crypto.randomBytes(20).toString('hex');
            bcrypt.hash(pass,10,function(err,hash) {
                User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password:hash
                },function(err,user){
                    if(err){
                        console.log('Error in google-strategy-passport to create user');
                        return;
                    }
                    return done(null,user);
                });
            })
           
        }
    });

}));
module.exports=passport;
