const User=require('../models/users');
const bcrypt=require('bcrypt');
// Render For SignUp
module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:'Passport Authentication | Sign Up'
    });
}
// Render For Sign In
module.exports.signIn=function(req,res){
    return res.render('sign_in',{
        title:'Passport Authentication | Sign In'
    });
}
// create user in Database
module.exports.create=function(req,res){

    if(req.body.password!=req.body.verify_password )
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Errror to find in User');
            return;
        }
        if(user){
            // To Refresh If user is alreay present
            return res.redirect('/users/sign-in');
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                // Store hash in database

                    req.body.password=hash;
                    // Storing user's data in Database(User)
                    User.create(req.body,function(err,user){
                        if(err){
                            console.log('Error in Storing user in Database');
                            return;
                        }
                        return res.redirect('/users/sign-in');

                    });


              });
            
        }
    });
}

// create Session in Database
module.exports.createSession=function(req,res){
   return res.redirect('/');
}
// destroy seession SignOut Functionality
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}

