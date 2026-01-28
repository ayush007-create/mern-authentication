const express = require('express')
const router = express.Router()
const {signup,login,logout,authenticate,verifyEmail,resetPassword,forgotPassword} = require('../controllers/app.controllers')
const verifyAuth = require('../middlewares/verifyingjwt')


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/verify-auth',verifyAuth,authenticate)
router.post('/verify-email',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

module.exports = router