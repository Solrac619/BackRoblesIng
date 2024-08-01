const express = require ('express');
const graficosController = require ('../controllers/graficosControllers');
const router = require('./formatos');

router.get('/:proyectoId',graficosController.getTotales);
router.get('/fecha/:fecha_inicio', graficosController.getTotalesTodosProyectos);

module.exports = router;