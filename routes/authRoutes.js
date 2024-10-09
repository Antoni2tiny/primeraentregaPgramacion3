const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// Ruta de registro
router.post('/register', registerUser);

// Ruta de inicio de sesión
router.post('/login', loginUser);

module.exports = router;
