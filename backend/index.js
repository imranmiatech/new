
const express =  require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
//const authMiddleware = require('./middleware/authMiddleware');


const app = express()
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST", "PUT", "DELETE"],
 
    credentials: true,
}))

app.use(express.json());
connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
//app.use(authMiddleware)
app.get('/protected', (req,res)=>{
    res.json({message: "This is a popular blog site in bangladesh"})
});


app.use("/blog",require('./route/api/blog'));

app.use("/email",require('./route/api/email'));

app.use("/visit",require('./route/api/visit'));

app.use("/user",require('./route/api/user'));

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
