const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginControllers');

router.post('/', LoginController.loginUsuario);

module.exports = router;