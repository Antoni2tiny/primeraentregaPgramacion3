const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/register', registrarUsuario);

// Ruta para iniciar sesión y obtener el token
router.post('/login', iniciarSesion);

module.exports = router;
