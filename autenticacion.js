// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiration } = require('./config');

// Generar un hash de contraseña
const hashPassword = (password) => bcrypt.hashSync(password, 8);

// Verificar la contraseña
const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

// Generar un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, tipoUsuario: user.idTipoUsuario }, jwtSecret, {
        expiresIn: jwtExpiration
    });
};

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) return res.sendStatus(403);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Guarda el usuario en la solicitud
        next();
    });
};

module.exports = { hashPassword, verifyPassword, generateToken, authenticateToken };
