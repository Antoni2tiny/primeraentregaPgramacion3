const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado, no se proporcionó un token');

  try {
    const verificado = jwt.verify(token, 'secret_key');
    req.usuario = verificado; 
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};

module.exports = verificarToken;
