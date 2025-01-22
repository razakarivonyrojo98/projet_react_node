const express = require("express");

const router = express.Router();

const decisionController = require("../controllers/decision.controller")

router.get("/", decisionController.getAllDecision);
router.get("/:id", decisionController.getById);
router.post("/", decisionController.addMonDecision);
router.put("/:id", decisionController.updateMonDecision);
router.delete("/:id", decisionController.deleteMonDecision);

module.exports = router;
