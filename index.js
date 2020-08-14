const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');


// For cookie-parser
app.use(cookieParser());
// for getting Schema OR Form Details (Key Value Pairs)
app.use(express.urlencoded({ useNewUrlParser: true }));

// middle of express Layouts
app.use(expressLayouts);

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
