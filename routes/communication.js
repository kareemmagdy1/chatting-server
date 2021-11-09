const express = require('express')
const router = express.Router()
const communicationController=require("../controllers/communication")

router.patch("/msg",communicationController.editMsg);
router.delete("/msg",communicationController.deleteMsg);
router.get("/msgs",communicationController.getMsgs);
router.post("/msg",communicationController.postMsg);

module.exports=router;