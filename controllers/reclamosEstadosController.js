const db = require ('../bd/bd');

//Obtener todos los Reclamos Estados
const obtenerReclamosEstados = (req, res) => {
    const query = 'SELECT * FROM reclamosestado WHERE activo = 1';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        return res.status(500).send('Error al obtener usuarios');
      }
      res.json(results);
    });
};

module.exports = {
    obtenerReclamosEstados
};