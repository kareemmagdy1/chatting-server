const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

/* 
const getLogOut= function(req, res){
    console.log("here is logout");
    req.logout();
    res.clearCookie("connect.sid");
    req.session.destroy(err => {
        console.log(err);
        res.status(200).json({"msg":"logged out"})
      });
} */

const postLogIn= (req,res,next)=>{
    let username=req.body.username;
    let password=req.body.password;
    let loadedUser;
    User.findOne({username:username},function(err,user){
        if(err){
         return res.status(404).json({"msg":err})
        }
        if(!user){
            return res.status(401).json({"msg":"wrong username"})
        }
        loadedUser=user ;
        return bcrypt.compare(password,user.password).then(isEqual=>{
            if(!isEqual){
                return res.statuse(401).json({"msg":"wrong credentials"})
            }
            const token=jwt.sign({email:loadedUser.username, userId:loadedUser._id.toString()},
            process.env.SECRET_KEY,{expiresIn:"1h"})
            return res.status(200).json({"msg":"logged in successfully","token":token,"userId":loadedUser._id.toString()})
        });
    })
}

const postSignUp=(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password,12).then(hashedPassword=>{
        let user = new User({ username: username, password:hashedPassword})
        user.save(function (err, doc) {
            if (err) {
                console.error(err);
                return res.status(500).json({"msg":err})
            }
            console.log("Document inserted succussfully!");
            console.log(user);
            return res.status(201).json({"userId":user._id.toString(),"msg":"User created successfully"})
        })
    })
}

/* 
const isAuth =(req,res,next)=>{
    if(req.user){
        next();
    }else{
    res.status(401).json({"msg":"Unauthorized request"})    
    }
}

const isLoggedIn=(req,res,next)=>{
    if(req.user){
        res.statuesMessage="already logged in"
        res.status(204).json({"msg":"you are already logged in"})
    }else{
    next()
    }
} */

module.exports.postLogIn=postLogIn;
module.exports.postSignUp=postSignUp;