const db = require('../bd/bd');

// Crear usuario
// const crearUsuario = (req, res) => {
//   const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } = req.body;
//   if (!nombre || !apellido || !correoElectronico || !contrasenia || !idTipoUsuario) {
//     return res.status(400).send('Todos los campos son obligatorios');
//   }

//   const query = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario], (err, result) => {
//     if (err) {
//       console.error('Error al crear usuario:', err);
//       return res.status(500).send('Error al crear usuario');
//     }
//     res.status(201).send('Usuario creado con éxito');
//   });
// };



// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  const query = 'SELECT * FROM usuarios WHERE activo = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(results);
  });
};

// Obtener usuario por ID
const obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE idUsuario = ? AND activo = 1';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener usuario:', err);
      return res.status(500).send('Error al obtener usuario');
    }
    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(results[0]);
  });
};

// Actualizar usuario
const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } = req.body;

  if (!nombre || !apellido || !correoElectronico || !idTipoUsuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, correoElectronico = ?, contrasenia = ?, idTipoUsuario = ? WHERE idUsuario = ?';
  db.query(query, [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).send('Error al actualizar usuario');
    }
    res.send('Usuario actualizado con éxito');
  });
};

// Desactivar usuario
const desactivarUsuario = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE usuarios SET activo = 0 WHERE idUsuario = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al desactivar usuario:', err);
      return res.status(500).send('Error al desactivar usuario');
    }
    res.send('Usuario desactivado con éxito');
  });
};

module.exports = {
  
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  desactivarUsuario,
};
