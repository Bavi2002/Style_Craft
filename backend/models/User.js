const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    phone:{
        type:String, 
        
    },
    profilePhoto:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User', userSchema);