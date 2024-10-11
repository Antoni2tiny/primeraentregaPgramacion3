const db = require('../bd/bd');

// Crear oficina
const crearOficina = (req, res) => {
  const { nombre, idReclamoTipo } = req.body;
  if (!nombre || !idReclamoTipo) {
    return res.status(400).send('Nombre e idReclamoTipo son obligatorios');
  }

  const query = 'INSERT INTO oficinas (nombre, idReclamoTipo) VALUES (?, ?)';
  db.query(query, [nombre, idReclamoTipo], (err, result) => {
    if (err) {
      console.error('Error al crear oficina:', err);
      return res.status(500).send('Error al crear oficina');
    }
    res.status(201).send('Oficina creada con éxito');
  });
};

// Obtener todas las oficinas
const obtenerOficinas = (req, res) => {
  const query = 'SELECT * FROM oficinas WHERE activo = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener oficinas:', err);
      return res.status(500).send('Error al obtener oficinas');
    }
    res.json(results);
  });
};

// Obtener oficina por ID
const obtenerOficinaPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM oficinas WHERE idOficina = ? AND activo = 1';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener oficina:', err);
      return res.status(500).send('Error al obtener oficina');
    }
    if (results.length === 0) {
      return res.status(404).send('Oficina no encontrada');
    }
    res.json(results[0]);
  });
};

// Actualizar oficina
const actualizarOficina = (req, res) => {
  const { id } = req.params;
  const { nombre, idReclamoTipo } = req.body;

  if (!nombre || !idReclamoTipo) {
    return res.status(400).send('Nombre e idReclamoTipo son obligatorios');
  }

  const query = 'UPDATE oficinas SET nombre = ?, idReclamoTipo = ? WHERE idOficina = ?';
  db.query(query, [nombre, idReclamoTipo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar oficina:', err);
      return res.status(500).send('Error al actualizar oficina');
    }
    res.send('Oficina actualizada con éxito');
  });
};

// Desactivar oficina
const desactivarOficina = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = 'UPDATE oficinas SET activo = 0 WHERE idOficina = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al desactivar oficina:', err);
      return res.status(500).send('Error al desactivar oficina');
    }
    res.send('Oficina desactivada con éxito');
  });
};

module.exports = {
  crearOficina,
  obtenerOficinas,
  obtenerOficinaPorId,
  actualizarOficina,
  desactivarOficina
};
