const bd = require ('../bd/bd');


//Obtener todos los tipos de reclamos en la base de datos
const obtenerReclamosTipos = (req, res) => {
    const query = 'SELECT * FROM reclamostipo WHERE activo = 1';
    bd.query(query, (err,result) => {
        if (err){
            console.error('Error al tratar de obtener los tipos de reclamos', err);
            return res.status(500).send('Error al obtener los tipos de reclamos');
        }
        res.json(result);

    })
}
module.exports = {obtenerReclamosTipos};