const express = require('express');
const router = express.Router();

// Ruta para mostrar la selección de oficinas
router.get('/oficinas', (req, res) => {
    res.render('oficinas', { title: 'Seleccionar Oficina' });
});

// Ruta para mostrar la vista de una oficina específica
router.get('/oficina', (req, res) => {
    const { oficina } = req.query;
    if (oficina) {
        res.render('oficina', { titulo: `Oficina de ${oficina.charAt(0).toUpperCase() + oficina.slice(1)}`, oficina });
    } else {
        res.status(400).send('Oficina no especificada');
    }
});

// Ruta para el login en una oficina
router.post('/login-oficina', (req, res) => {
    const { usuario, contrasena, oficina } = req.body;
    //  autenticación del usuario para la oficina seleccionada
    res.send(`Login para la oficina de ${oficina}`);
});

module.exports = router;
