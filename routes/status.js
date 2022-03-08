const express = require('express')
const router = express.Router()
const statusController=require("../controllers/status")


router.get("/status",statusController.getStatus)

router.post("/status",statusController.postStatus)

module.exports=router;
