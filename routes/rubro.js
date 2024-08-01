const express = require('express');
const router = express.Router();
const rubroController = require('../controllers/rubroController');

router.get('/', rubroController.getAllRubro);
router.get('/:id', rubroController.getrubroById);
router.post('/', rubroController.createrubro);
router.put('/:id', rubroController.updaterubro);
router.delete('/:id', rubroController.deleterubro);

module.exports = router;
