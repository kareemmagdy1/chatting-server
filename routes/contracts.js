const express = require('express')
const router = express.Router()
const contractsController=require("../controllers/contracts")

router.post("/proposal/:id/acceptance",contractsController.postAcceptContractProposal)
router.post("/proposal/:id/denial",contractsController.postDeclineContractProposal)
router.post("/proposal",contractsController.postContractProposal)

router.get("/proposals",contractsController.getProposals);
router.get("/contracts",contractsController.getContracts)

module.exports=router ;
