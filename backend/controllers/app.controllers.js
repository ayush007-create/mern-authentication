const bcrypt = require('bcrypt')
const dbModel = require('../models/database.models')
const generatecookie = require('../utils/generatingcookie')
const {sendVerificationEmail,sendWelcomeEmail,sendResetPasswordRequestEmail,sendResetPasswordSuccessEmail} = require('../mailtrap/emailsender')
const crypto = require('crypto')

const signup = async (req,res)=>{
    try {
        const {username,email,password}=req.body
        if(!username || !email || !password){
            throw new Error("All Field Required!")
        }
        const user = await dbModel.findOne({email})
        if(user){
            throw new Error("User Already Exists!")
        }
        const hashedpass = await bcrypt.hash(password,10)
        const verificationToken = crypto.randomInt(100000,1000000).toString()
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000
        const newuser = await dbModel.create({
            username,
            email,
            password:hashedpass,
            verificationToken,
            verificationTokenExpiresAt,
        })
        await generatecookie(res,newuser._id)
        await sendVerificationEmail(newuser.email,verificationToken)
        res.status(201).json({success:true,message:'Signed Up Successfully!',user:{...newuser._doc,password:undefined}})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

const verifyEmail = async (req,res) => {
    try {
        const {code} = req.body
        const user = await dbModel.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()},
        })
        if(!user){
            throw new Error("Invalid or Expired Code")
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        sendWelcomeEmail(user.email,user.username)
        res.status(200).json({success:true,message:"Verified Successfully!",user:{...user._doc,password:undefined}})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await dbModel.findOne({email})
        if(!user){
            throw new Error("Email or Password is incorrect!")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error("Email or Password is incorrect!")
        }
        user.lastlogin = Date.now()
        await user.save()
        await generatecookie(res,user._id)
        res.status(200).json({
            success:true,
            message:'Logged In Successfully!',
            user:{...user._doc,password:undefined}})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }

}

const logout = async (req,res)=>{
    res.clearCookie("newauthcookie")
    res.status(200).json({success:true,message:'Logged Out Successfully!'})
}

const authenticate = async (req,res)=>{
    try {
        const user = await dbModel.findById(req.userId).select("-password");
        if(!user){
            throw new Error('User Not Found')
        }
        res.status(200).json({success:true,user:{...user._doc,password:undefined}})
    } catch (error) {
        res.status(200).json({success:false,message:error.message})
    }
}

const forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body
        const user = await dbModel.findOne({email})
        if(!user){
            throw new Error("User Not Found!")
        }
        const resetPasswordToken = crypto.randomBytes(20).toString("hex")
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt
        await user.save()
        sendResetPasswordRequestEmail(user.email,`${process.env.CLIENT_URL}reset-password/${resetPasswordToken}`)
        res.status(200).json({success:true,message:"Reset Password Request Email sent Successfully!"})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})        
    }
}

const resetPassword = async (req,res) =>{
   try {
     const {token} = req.params
     const {password} = req.body
     const user = await dbModel.findOne({
        resetPasswordToken:token,
        resetPasswordTokenExpiresAt:{$gt:Date.now()}
     })
     if(!user){
        throw new Error("User not Found!")
     }
     const hashedpass = await bcrypt.hash(password,10)
     user.password = hashedpass
     user.resetPasswordToken = undefined
     user.resetPasswordTokenExpiresAt = undefined
     await user.save()
     sendResetPasswordSuccessEmail(user.email)
     res.status(200).json({success:true,message:"Password Reset Successful!"})
   } catch (error) {
    res.status(400).json({success:false,message:error.message})
   }
}

module.exports = {signup,login,logout,authenticate,verifyEmail,forgotPassword,resetPassword}