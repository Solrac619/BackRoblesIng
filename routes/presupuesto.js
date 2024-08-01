const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController.js');

router.get('/', presupuestoController.getAllPresupuestos);
router.get('/:id', presupuestoController.getPresupuestoById);
router.post('/', presupuestoController.createPresupuesto);
router.put('/:id', presupuestoController.updatePresupuesto);
router.delete('/:id', presupuestoController.deletePresupuesto);


module.exports = router;
