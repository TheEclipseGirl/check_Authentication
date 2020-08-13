const express=require('express');
const port=8000;
const app=express();





// To Run The Server
app.listen(port,function(err,){

    if(err){
        console.log(`OOPs!! Error in running server: ${err}`);
        return;
    }
    console.log(`Great Server is up and ruuning at :${port}`);
})