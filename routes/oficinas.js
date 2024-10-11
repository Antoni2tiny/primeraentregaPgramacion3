const express = require('express');
const router = express.Router();
const oficinasController = require('../controllers/oficinasController');

// Rutas para oficinas
router.post('/', oficinasController.crearOficina);
router.get('/', oficinasController.obtenerOficinas);
router.get('/:id', oficinasController.obtenerOficinaPorId);
router.put('/:id', oficinasController.actualizarOficina);
router.put('/desactivar/:id', oficinasController.desactivarOficina);

module.exports = router;
