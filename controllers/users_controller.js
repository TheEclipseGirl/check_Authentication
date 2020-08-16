const User=require('../models/users');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
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
// Forget Password Page Render
module.exports.forgetPassword=function(req,res){
    return res.render('forget_password',{
        title:'Authentication | Forget'
    });
}

// 
module.exports.changePassword=function(req,res){
    if(req.body.password!=req.body.verify_password )
    {
        req.flash('error','Password does not matched!!');
        return res.redirect('back');
    }

    // TO check if password contains numbers and s.characters and length of 6
    
    // For Numbers
    function hasNumbers(str){
        var regex = /\d/g;
        return regex.test(str);
    }
    // Special Characters
    function hasSpecialChar(str){
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    }
    let p=req.body.password ;

    if(p.length<6 ||  !hasNumbers(p) || !hasSpecialChar(p)){
        req.flash('error','Password should contain number and special character!')
        return res.redirect('back')
    }


    bcrypt.hash(req.body.password, 10, function(err, hash){
        User.findByIdAndUpdate(req.user.id, {password: hash}, function(err, user){
            if(err){
                console.log('Error shows in finding and Updating Password')
                return;
            }
            req.flash('success','password changed successfully!!');
            return res.redirect('back');
        });
        

    
    });
    
        
    
}



// update password 
module.exports.updatePassword=function(req,res){
   return  res.render('change_password',{
    title:'Authentication | Update'
   });
}
    

// create user in Database
module.exports.create=function(req,res){

    if(req.body.password!=req.body.verify_password )
    {
        req.flash('error','Password does not matched!!');
        return res.redirect('back');
    }

    // TO check if password contains numbers and s.characters and length of 6
    
    // For Numbers
    function hasNumbers(str){
        var regex = /\d/g;
        return regex.test(str);
    }
    // Special Characters
    function hasSpecialChar(str){
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    }
    let p=req.body.password ;

    if(p.length<6 ||  !hasNumbers(p) || !hasSpecialChar(p)){
        req.flash('error','Password should contain number and special character!')
        return res.redirect('back')
    }
        
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('error',err);
            console.log('Errror to find in User');
            return;
        }
        if(user){
            req.flash('error','User Already Exists');
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
                        req.flash('success','Succesfully Created');
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
// Send Reset Email
module.exports.emailReset=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error to find User');
            return;
        }
        if(!user){
            // TODO
            return res.redirect('back');
        }else{
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                     auth: {
                     user: 'abc@gmail.com',
                     pass: 'your Email'
                },
                tls: {
                    rejectUnauthorized: false
                }
              });
              
                let mailOptions = {
                    from: 'abc@gmail.com',
                    to: req.body.email,
                    subject: 'Sending Email using Node.js',
                    text: 'I Got Ur Email_ID!!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }

                
                });
                return res.redirect('/users/sign-in');
        }
    })
}


