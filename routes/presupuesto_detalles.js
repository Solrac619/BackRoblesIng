const express = require('express');
const router = express.Router();
const presupuestoDetallesController = require('../controllers/presupuesto_detallesController');


// Operaciones CRUD para detalles del presupuesto
router.get('/:proyectoId', presupuestoDetallesController.getPresupuestoDetalleById);
router.post('/', presupuestoDetallesController.createPresupuestoDetalle);
router.put('/:id', presupuestoDetallesController.updatePresupuestoDetalle);
router.delete('/:id', presupuestoDetallesController.deletePresupuestoDetalle);

module.exports = router;
