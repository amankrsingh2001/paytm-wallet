const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:16,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6
    },
},{
    timestamps:true
})

 const User = mongoose.model('User', userSchema)
 module.exports = {
    User
 }



