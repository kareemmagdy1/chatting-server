const express = require('express')
const router = express.Router()
const normalController=require("../controllers/normal");

router.post("/msg",normalController.postMsg);
router.post("/contact",normalController.postContactProposal)
router.get("/:id/msg",normalController.getMsg)
router.get("/:id/proposals",normalController.getProposals)
router.get("/:id/contacts",normalController.getContacts)
router.get("/", normalController.defaultRoute);
module.exports=router;