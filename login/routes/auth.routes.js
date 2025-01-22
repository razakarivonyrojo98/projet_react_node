const express= require('express');

const router= express.Router();
const usercontroller = require('../controllers/auth.controller');

router.post('/registre', usercontroller.registre);
router.post('/login', usercontroller.login);
router.get('/', usercontroller.user);

module.exports = router;