const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const approuter = require('./routes/app.routes')
const connectToDb = require('./config/dbconnection')
const path = require('path')


app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

dotenv.config()

app.use('/', approuter)  // API routes first

if (process.env.NODE_ENV === "production") {
	const frontendPath = path.join(__dirname, '../frontend/dist'); // go up one level, then frontend/dist

    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html')); // ✅ use frontendPath
    });
}

app.listen(process.env.PORT,()=>{
    connectToDb()
    console.log("Server is Running")
})