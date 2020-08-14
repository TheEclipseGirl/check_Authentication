const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/authentication_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error Connecting to MOngoDb'));

db.once('open', function(){
    console.log('Well!! Connectiing To Database')
});
module.exports=db;