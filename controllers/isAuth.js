const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const decoder=(req,res,next)=>{
    const authHeader=req.get("Authorization");
    if(!authHeader){
        return res.status(500).json({"msg":"no authentication token supplied"})
    }
    const token=authHeader.split(" ")[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,process.env.SECRET_KEY)
    }catch(err){
        return res.status(500).json({"msg":"could not verify token"})
    }
    if(!decodedToken){
        return res.status(401).json({"msg":"not authenticated"})
    }
    req.userId=decodedToken.userId;
    next()
}

module.exports=decoder