const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const { Strategy } = require('passport');
const passportLocal=require('./config/passport-local-Strategy');
const MongoStore=require('connect-mongo')(session);
const nodemailer=require('nodemailer');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle=require('./config/passport.google-oauth2-strategy');

// FOR SASS
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

// assets middleware
app.use(express.static('./assets'));
// For cookie-parser
app.use(cookieParser());
// for getting Schema OR Form Details (Key Value Pairs)
app.use(express.urlencoded({ useNewUrlParser: true }));

// middle of express Layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Use to create session
app.use(session({
    name:'Auc',
    secret:'alpha',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
       console.log(err || 'connecting To MongoDb ');
    })
    
   
}));
app.use(passport.initialize());
app.use(passport.session());

//  Notification For Flash
app.use(flash());
app.use(customMware.setFlash);

//routing middleware
app.use('/', require('./routes'));


//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');




// To Run The Server
app.listen(port,function(err,){

    if(err){
        console.log(`OOPs!! Error in running server: ${err}`);
        return;
    }
    console.log(`Great Server is up and ruuning at :${port}`);
});
