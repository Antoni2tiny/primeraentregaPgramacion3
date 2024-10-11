const db = require('../bd/bd');
const enviarCorreo = require('../utils/mailer')

const jwt = require('jsonwebtoken');


// Crear reclamo
const crearReclamo = (req, res) => {
  const { asunto, descripcion, idReclamoTipo, idUsuarioCreador } = req.body;
  if (!asunto || !idReclamoTipo || !idUsuarioCreador) {
    return res.status(400).send('Asunto, idReclamoTipo y idUsuarioCreador son obligatorios');
  }

  const query = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
                 VALUES (?, ?, NOW(), 1, ?, ?)`;
  db.query(query, [asunto, descripcion, idReclamoTipo, idUsuarioCreador], (err, result) => {
    if (err) {
      console.error('Error al crear reclamo:', err);
      return res.status(500).send('Error al crear reclamo');
    }
    res.status(201).send('Reclamo creado con éxito');
  });
};

// Obtener todos los reclamos
const obtenerReclamos = (req, res) => {
  const query = 'SELECT * FROM reclamos WHERE idReclamoEstado != 3'; // No reclamos cancelados
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener reclamos:', err);
      return res.status(500).send('Error al obtener reclamos');
    }
    res.json(results);
  });
};

// Obtener reclamo por ID
const obtenerReclamoPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener reclamo:', err);
      return res.status(500).send('Error al obtener reclamo');
    }
    if (results.length === 0) {
      return res.status(404).send('Reclamo no encontrado');
    }
    res.json(results[0]);
  });
};

// Actualizar reclamo
const actualizarReclamo = (req, res) => {
  const { id } = req.params;
  const { asunto, descripcion, idReclamoEstado } = req.body;

  if (!asunto || !idReclamoEstado) {
    return res.status(400).send('Asunto e idReclamoEstado son obligatorios');
  }

  const query = 'UPDATE reclamos SET asunto = ?, descripcion = ?, idReclamoEstado = ? WHERE idReclamo = ?';
  db.query(query, [asunto, descripcion, idReclamoEstado, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar reclamo:', err);
      return res.status(500).send('Error al actualizar reclamo');
    }
    res.send('Reclamo actualizado con éxito');
  });
};

// Finalizar reclamo
const finalizarReclamo = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE reclamos SET idReclamoEstado = 2, fechaFinalizado = NOW() WHERE idReclamo = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al finalizar reclamo:', err);
      return res.status(500).send('Error al finalizar reclamo');
    }
    res.send('Reclamo finalizado con éxito');
  });
};

// Cancelar reclamo
const cancelarReclamo = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE reclamos SET idReclamoEstado = 3, fechaCancelado = NOW() WHERE idReclamo = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al cancelar reclamo:', err);
      return res.status(500).send('Error al cancelar reclamo');
    }
    res.send('Reclamo cancelado con éxito');
  });
};




const cambiarEstadoReclamo = async (req, res) => {
  const { idReclamo, idReclamoEstado } = req.body;
  const token = req.headers['authorization'];
  

  // Verificamos si el token es válido
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const idUsuario = decodedToken.idUsuario;
    
    // Consulta para obtener el tipo de usuario
    const [usuario] = await db.query('SELECT idTipoUsuario FROM usuarios WHERE idUsuario = ?', [idUsuario]);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario es un empleado
    if (usuario.idTipoUsuario !== 2) { // Asumiendo que 2 es el idTipoUsuario de empleado
      return res.status(403).json({ message: 'Acceso denegado. Solo los empleados pueden cambiar el estado de los reclamos.' });
    }

    // Ahora verificamos si el empleado pertenece a la oficina correspondiente
    const [reclamo] = await db.query('SELECT idOficina FROM reclamos WHERE idReclamo = ?', [idReclamo]);
    const [empleadoOficina] = await db.query('SELECT idOficina FROM usuariosOficinas WHERE idUsuario = ?', [idUsuario]);

    if (!empleadoOficina || empleadoOficina.idOficina !== reclamo.idOficina) {
      return res.status(403).json({ message: 'Acceso denegado. No puede cambiar el estado de reclamos que no pertenecen a su oficina.' });
    }

    // Si todo está bien, cambiamos el estado del reclamo
    await db.query('UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?', [idReclamoEstado, idReclamo]);

    res.status(200).json({ message: 'El estado del reclamo se ha actualizado correctamente.' });
    
    enviarCorreo();

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
  }
  
};

module.exports = {
  crearReclamo,
  obtenerReclamos,
  obtenerReclamoPorId,
  actualizarReclamo,
  finalizarReclamo,
  cancelarReclamo,
  cambiarEstadoReclamo
};
