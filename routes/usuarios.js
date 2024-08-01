const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers//usarioController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, usuarioController.getAllUsuarios);
router.get('/:id', authMiddleware, usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', authMiddleware, usuarioController.updateUsuario);
router.delete('/:id', authMiddleware, usuarioController.deleteUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
