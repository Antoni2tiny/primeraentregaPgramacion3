const express = require('express');
const router = express.Router();
const reclamosController = require('../controllers/reclamosController');

// Rutas
router.get('/', reclamosController.mostrarInicio);
router.get('/reclamos', reclamosController.mostrarFormularioReclamos);
router.post('/reclamos', reclamosController.procesarReclamo);
router.get('/oficinas', reclamosController.mostrarOficinas);

module.exports = router;
