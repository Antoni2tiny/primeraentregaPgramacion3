const express = require ('express');
const router = express.Router();
const reclamosTiposController = require ('../controllers/reclamosTiposController');

//Rutas para los endpoint de consulta de reclamos tipos

router.get('/',reclamosTiposController.obtenerReclamosTipos);


module.exports = router; 