const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const defaultRoute=(req,res,next)=>{
  
    console.log("default");
    return res.status(200).json({"msg":"default route reached"})

}


module.exports.defaultRoute=defaultRoute;