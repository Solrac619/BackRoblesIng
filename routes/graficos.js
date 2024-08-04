const express = require ('express');
const graficosController = require ('../controllers/graficosControllers');
const router = require('./formatos');

router.get('/:proyectoId/:fecha_inicio/:fecha_fin',graficosController.getTotales);
router.get('/fecha/datos/:fecha_inicio/:fecha_fin', graficosController.getTotalesTodosProyectos);


module.exports = router;