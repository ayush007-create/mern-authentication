const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

async function connectToDb(){
    await mongoose.connect(process.env.conn).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log("Error in Database connection",err)
    })
}

module.exports = connectToDb