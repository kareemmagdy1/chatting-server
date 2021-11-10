const express = require("express")
const app = express()
const mongoose = require('mongoose');
require("dotenv").config();


const URI=process.env.DATABASE_URI;

const authenticationRoutes=require("./routes/authentication");
const contractsRoutes=require("./routes/contracts");
const communicationRoutes=require("./routes/communication");
const isAuth=require("./controllers/isAuth");
const statusRoutes=require("./routes/status")

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET , POST , DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
})

app.use("/status",statusRoutes)
app.use(authenticationRoutes);
app.use(isAuth,contractsRoutes);
app.use(isAuth,communicationRoutes);

mongoose.connect(URI).then(result => {
    console.log("connected");
    app.listen(process.env.PORT);
})  