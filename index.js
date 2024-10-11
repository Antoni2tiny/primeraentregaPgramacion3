const express = require('express');
const app = express();
const oficinasRoutes = require('./routes/oficinas');
const reclamosRoutes = require('./routes/reclamos');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');
const reclamosEstadoRoutes = require('./routes/reclamosEstado');
const reclamosTiposRoutes = require('./routes/reclamosTipos');

const verificarToken = require('./middleware/authMiddleware');

require('dotenv').config();

app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/oficinas', verificarToken, oficinasRoutes);
app.use('/reclamos', verificarToken, reclamosRoutes);
app.use('/usuarios', verificarToken, usuariosRoutes);

app.use('/reclamosEstado', verificarToken, reclamosEstadoRoutes);
app.use('/reclamosTipos', reclamosTiposRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
