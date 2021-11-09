const express = require('express')
const router = express.Router()
const normalController=require("../controllers/normal");


router.get("/", normalController.defaultRoute);

module.exports=router;