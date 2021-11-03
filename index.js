const express = require("express")
const app = express()
const mongoose = require('mongoose');
require("dotenv").config();



const User=require("./models/User");
const URI=process.env.DATABASE_URI;
const authenticationRoutes=require("./routes/authentication")
const protectedRoutes=require("./routes/protectedRoutes")
const isAuth=require("./controllers/isAuth");
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET , POST , DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
})


app.use(authenticationRoutes);
app.use(isAuth,protectedRoutes)
mongoose.connect(URI).then(result => {
    console.log("7mada");
    app.listen(3000);
})


