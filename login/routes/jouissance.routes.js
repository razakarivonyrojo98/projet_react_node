const express = require("express");

const router = express.Router();

const JouissanceController = require("../controllers/jouissance.controller");

router.get("/", JouissanceController.getAllJouissance);
router.get("/:id", JouissanceController.getById);
router.post("/", JouissanceController.addJouissance);
router.put("/:id", JouissanceController.updateJouissance);
router.delete("/:id", JouissanceController.deleteJouissance);

module.exports = router;
