const express = require ('express');
const router = express.Router();
const reclamoEstadosController = require('../controllers/reclamosEstadosController');

//Rutas para los Endpoint de la entidad reclamos estados

router.get('/',reclamoEstadosController.obtenerReclamosEstados);

module.exports = router;