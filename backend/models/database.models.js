const mongoose = require('mongoose')

const newmodel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    lastlogin:{
        type:Date,
        default:Date.now(),
    },
    isVerified:{
        type:String,
        default:false,
    },
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true})

const newusermodel = mongoose.model('revisionmodel',newmodel)

module.exports = newusermodel