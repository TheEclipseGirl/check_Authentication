module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:'Passport Authentication | Sign Up'
    });
}

module.exports.signIn=function(req,res){
    return res.render('sign_in',{
        title:'Passport Authentication | Sign In'
    });
}