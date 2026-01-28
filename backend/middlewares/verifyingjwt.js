const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function verifyAuth(req,res,next){
    const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }); // return stops execution
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token Invalid" }); // <-- add return here
    }

    req.user = decoded;
    next(); // only called if token is valid
  });
}

module.exports=verifyAuth