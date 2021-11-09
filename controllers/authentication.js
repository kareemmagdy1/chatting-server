const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const postLogIn= (req,res,next)=>{
    
    let username=req.body.username;
    let password=req.body.password;
    if(username==undefined || password==undefined){
        return res.status(422).json({"msg":"conflict in input"})
    }
    User.findOne({username:username},async function(err,user){
        if(err){
         return res.status(500).json({"msg":err})
        }

        if(!user){
            return res.status(401).json({"msg":"wrong username"})
        }
        let isEqual=await bcrypt.compare(password,user.password);
        
        if(!isEqual){
            return res.status(401).json({"msg":"wrong credentials"})
        }else{
            const token=jwt.sign({email:user.username, userId:user._id.toString()},
            process.env.SECRET_KEY,{expiresIn:"1h"})
            return res.status(200).json({"msg":"logged in successfully","token":token,"userId":user._id.toString()})            
        }
    });
}

const postSignUp= async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email=req.body.email;
    console.log(password)
    if(username==undefined || password==undefined){
        return res.status(422).json({"msg":"conflict in input"})
    }
    let hashedPassword=await bcrypt.hash(password,12)
    await User.findOne({username:username},function(err,user){
        if(err){
            return res.status(500).json({"msg":"an unexpected error occurred"})
        }
        if(user){
            return res.status(422).json({"msg":"username already exists"})
        }
    })
    let user = new User({ username: username,email:email, password:hashedPassword})
    user.save(function (err, doc) {
        if (err) {
            console.error(err);
            return res.status(500).json({"msg":err})
        }
        console.log("Document inserted successfully!");
        console.log(user);
        return res.status(201).json({"userId":user._id.toString(),"msg":"User created successfully"})
    })
}

module.exports.postLogIn=postLogIn;
module.exports.postSignUp=postSignUp;