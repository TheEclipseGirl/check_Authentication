const User = require('../models/users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


// for Authentication of user
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    function(req,email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> PASSPORT');
                req.flash('error',err);
                return done(err);
            }
            if(!user){
                req.flash('error','Invalid Username or Password');
                console.log('Invalid Username');
                return done(null, false);
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if(res) {
                    // Passwords matching Code
                    return done(null, user);
                } else {
                    // Passwords don't matching Code
                    console.log('Invalid Password');
                    req.flash('error','Invalid Username or Password');
                    return done(null, false);
                } 
            });
        });
    }
));

// serializing user 
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// desearilizing user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> PASSPORT');
            return done(err);
        }
        return done(null, user);
    });
});

// user authenticated or not ?
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        req.flash('success','Authenticated User');
        return next();
    }
    return res.redirect('/users/sign-in');
}

//user is not Authenticate
passport.notAuthenticated = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

//to set user for the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;