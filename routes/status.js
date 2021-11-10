const express = require('express')
const router = express.Router()
const statusController=require("../controllers/status")


router.get(statusController.getStatus)

router.post(statusController.postStatus)

module.exports=router;
