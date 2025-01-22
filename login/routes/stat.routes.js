const express = require("express");

const router = express.Router();

const StatController = require("../controllers/stat.controller")

router.get("/decision", StatController.getAllStatDecision);
router.get("/conge", StatController.getAllStatConge);
router.get("/jouissance", StatController.getAllStatJouissance);


module.exports = router;
