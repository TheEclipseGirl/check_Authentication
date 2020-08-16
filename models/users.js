// Import Mongoose for Db
const mongoose=require('mongoose');

// Made Schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
    birthday:{
        type:Date,
        required:false
    }
},{
    timestamps:true

});

const User=mongoose.model('User',userSchema);
module.exports=User;