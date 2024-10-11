const express = require('express');
const router = express.Router();
const reclamosController = require('../controllers/reclamosController');

// Rutas para reclamos
router.post('/', reclamosController.crearReclamo);
router.get('/', reclamosController.obtenerReclamos);
router.get('/:id', reclamosController.obtenerReclamoPorId);
router.put('/:id', reclamosController.actualizarReclamo);
router.patch('/reclamos/:idReclamo/cambiar-estado', reclamosController.cambiarEstadoReclamo);
router.put('/finalizar/:id', reclamosController.finalizarReclamo);
router.put('/cancelar/:id', reclamosController.cancelarReclamo);

module.exports = router;
