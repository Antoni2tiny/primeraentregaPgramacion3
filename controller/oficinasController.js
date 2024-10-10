import {conexion} from '../db/conexion.js';

//GET
export const getAllOficinas = async (req, res) => {
    try{
        const sql = "SELECT * FROM `oficinas`";

        const [result] = await conexion.query(sql);

        res.status(200).json(result);

    }catch(err){
        res.status(500).json({
            mensaje: "Erro interno."
        });
    }
}

//GET ID
export const getOficinasById = async (req, res) => {
    try{
        const {idOficina} = req.params;

        const sql = "SELECT * FROM `oficinas` WHERE activo = 1 AND idOficina = ?";

        const [result] = await conexion.query(sql, idOficina);

        if (result.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontró oficina."
            });
        }

        res.status(200).json(result);
    
    }catch(err){
        res.status(500).json({
            mensaje: "Error interno.",
            error: err.message
        });
    }
}

// PATCH
export const updateOficinas = async (req, res) => {
    try{
        const {nombre, idReclamoTipo, activo} = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "Se requiere el campo nombre."
            });
        }

        if (!idReclamoTipo) {
            return res.status(400).json({
                mensaje: "Se requiere el campo idReclamoTipo."
            });
        }
        
        if (activo === undefined || activo === null) {
            return res.status(400).json({
                mensaje: "Se requiere el campo activo."
            });
        }

        const {idOficina} = req.params;

        const sql = "UPDATE oficinas SET nombre = ?, idReclamoTipo = ?, activo = ? WHERE idOficina = ?"

        const [result] = await conexion.query(sql, [nombre, idReclamoTipo, activo, idOficina]);

        if(result.affectedRows === 0){
            return res.status(404),json({
                mensaje: "No se pudo modificar."
            })
        }

        res.status(200).json({
            mensaje: "Tipo reclamo modificado."
        });
    }catch{
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}

//POST
export const createOficinas = async (req, res) => {
    try {
        const {nombre, idReclamoTipo} = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "Se requiere el campo nombre."
            });
        }

        if (!idReclamoTipo) {
            return res.status(400).json({
                mensaje: "Se requiere el campo idReclamoTipo."
            });
        }

        const sql = "INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,1)";

        const [result] = await conexion.query(sql,[nombre,idReclamoTipo])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear."
            })
        }

        res.status(200).json({
            mensaje: "Oficina creada."
        })

    } catch (err) {
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}

//DELETE
export const deleteOficinas = async (req,res) => {
    try {
        const {idOficina} = req.params;

        const sql = "UPDATE `oficinas` SET activo = 0 WHERE idOficina = ?";

        const [result] = await conexion.query(sql,idOficina);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo eliminar."
            })
        }

        res.status(200).json({
            mensaje: "Oficina eliminada."
        })

    } catch (err) {
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}