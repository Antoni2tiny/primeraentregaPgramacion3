import {conexion} from '../db/conexion.js';

// GET
export const getAllTiposReclamos = async (req, res) => {
    try{
        const sql = 'SELECT * FROM reclamos_tipo WHERE activo = 1';

        const [result] = await conexion.query(sql);

        res.status(200).json(result);

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
};

// GET ID
export const getReclamosTipoById = async (req, res) => {
    try {
        const { idReclamosTipo } = req.params;

        const sql = 'SELECT * FROM reclamos_tipo WHERE activo = 1 AND idReclamosTipo = ?;'; 

        const [result] = await conexion.query(sql, idReclamosTipo);

        if (result.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontró tipo reclamo."
            });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
};

// PATCH
export const updateReclamosTipoById = async (req, res) => {
    try {

        const {descripcion, activo} = req.body;

        if(!descripcion) {
            return res.status(400).json({
                mensaje:"Se requiere el campo descipcion."
            })
        }

        if (activo === undefined || activo === null){
            return res.status(400).json({ 
                mensaje: "Se requiere el campo activo."    
            })
        }

        const {idReclamosTipo} = req.params;

        const sql = 'UPDATE reclamos_tipo SET descripcion = ? , activo = ?  WHERE idReclamosTipo = ?';
        const [result] = await conexion.query(sql, [descripcion,activo,idReclamosTipo]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                mensaje: "No se pudo modificar."
            })
        }

        res.status(200).json({
            mensaje: "Tipo reclamo modificado."
        });

    }catch (err) {
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}

// POST
export const createTiposReclamos = async (req,res) => {

    try {
    const {descripcion} = req.body;

        if(!descripcion) {
            return res.status(400).json({
                mensaje:"Se requiere el campo descipcion."
            })
        }

        const sql = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, 1);';
        const [result] = await conexion.query(sql, [descripcion]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                mensaje: "No se pudo crear."
            })
        }

        res.status(200).json({
            mensaje: "Tipo reclamo creado."
        });

    }catch (err) {
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}

// DELETE
export const deleteTiposReclamoso = async (req, res) => {
    try{
        const {idReclamosTipo} = req.params;

        const sql = "UPDATE `reclamos_tipo` SET activo = 0 WHERE idReclamosTipo = ?";
        const [result] = await conexion.query(sql, idReclamosTipo);

        if(result.affectedRows === 0){
            return res.status(404).json({
                mensaje: "No se pudo eliminar."
            })
        }

        res.status(200).json({
            mensaje: "Tipo reclamo eliminado."
        });

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
}