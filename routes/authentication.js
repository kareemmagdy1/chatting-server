const express = require('express')
const router = express.Router()
const authenticationController=require("../controllers/authentication")

router.post('/login',authenticationController.postLogIn);

router.post("/signup",authenticationController.postSignUp);



module.exports=router;