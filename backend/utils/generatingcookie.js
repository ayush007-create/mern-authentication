const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function generatecookie(res,id) {
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.cookie('newauthcookie',token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production",
        maxAge:24*60*60*1000,
    })
    
}

module.exports = generatecookie