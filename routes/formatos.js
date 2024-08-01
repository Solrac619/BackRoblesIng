const express = require('express');
const router = express.Router();
const formatoController = require('../controllers/formatosController');

router.post('/:tabla', formatoController.upload, formatoController.uploadFile);
router.get('/list', formatoController.listFiles);

module.exports = router;
