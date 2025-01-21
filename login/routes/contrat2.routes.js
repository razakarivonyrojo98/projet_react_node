const express = require("express");

const router = express.Router();

const contrat2Controller = require("../controllers/contrat2.controller");

router.get("/", contrat2Controller.getAllMonContrat2);
router.get("/:id", contrat2Controller.getById);
router.post("/", contrat2Controller.addMonContrat2);
router.put("/:id", contrat2Controller.updateMonContrat2);
router.delete("/:id", contrat2Controller.deleteMonContrat2);

module.exports = router;
