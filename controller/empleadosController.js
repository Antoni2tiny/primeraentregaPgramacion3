import { json } from 'express';
import {conexion} from '../db/conexion.js';

// GET
export const getAllEmpleados = async (req,res) => {
    try{
        const sql = "SELECT * FROM `usuarios` WHERE idTipoUsuario = 2;";

        const [result] = await conexion.query(sql);

        res.status(200).json(result);

    }catch(err){
        res.status(500),json({
            mensaje: "Error interno."
        });
    }
}

// GET ID
export const getEmpleadoById = async (req,res) => {
    try{
        const {idUsuario} = req.params;

        const sql = "SELECT * FROM `usuarios` WHERE idTipoUsuario = 2 AND idUsuario = ?;";

        const [result] = await conexion.query(sql, idUsuario);

        if (result.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontró el empleado."
            });
        }

        res.status(200).json(result);
    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        });
    }
}

// PATCH
export const updateEmpleadosById = async (req,res) => {
    try{
        const { nombre,
            apellido,
            correoElectronico,
            contrasenia,
            imagen } = req.body;
            
        if (!nombre) {
            return res.status(400).json({
                mensaje:"Se requiere el campo nombre."
            })
        }

        if (!apellido) {
            return res.status(400).json({
                mensaje:"Se requiere el campo apellido."
            })
        }

        if (!correoElectronico) {
            return res.status(400).json({
                mensaje:"Se requiere el campo correoElectronico."
            })
        }

        if (!contrasenia) {
            return res.status(400).json({
                mensaje:"Se requiere el campo contrasenia."
            })
        }

        // if (!imagen) {
        //     return res.status(400).json({
        //         mensaje:"Se requiere el campo imagen."
        //     })
        // }

        const {idUsuario} = req.params;

        const sql = "UPDATE `usuarios` SET nombre = ?, apellido = ?, correoElectronico = ?, contrasenia = ?,imagen = ? WHERE idUsuario = ? AND idTipoUsuario = 2 ";

        const [result] = await conexion.query(sql, [nombre,apellido,correoElectronico,contrasenia,imagen,idUsuario])

        console.log(result);

        if(result.affectedRows === 0){
            return res.status(404),json({
                mensaje: "No se pudo modificar."
            })
        }

        res.status(200).json({
            mensaje: "Empleado modificado."
        });

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
}

// POST
export const createEmpleado = async (req,res) => {
    try {
        const {nombre,
            apellido,
            correoElectronico,
            contrasenia,
            imagen} = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje:"Se requiere el campo nombre."
            })
        }

        if (!apellido) {
            return res.status(400).json({
                mensaje:"Se requiere el campo apellido."
            })
        }

        if (!correoElectronico) {
            return res.status(400).json({
                mensaje:"Se requiere el campo correoElectronico."
            })
        }

        if (!contrasenia) {
            return res.status(400).json({
                mensaje:"Se requiere el campo contrasenia."
            })
        }

        const sql = "INSERT INTO `usuarios` (nombre,apellido,correoElectronico,contrasenia, idTipoUsuario,imagen) VALUES (?,?,?,?,2,?)";

        const [result] = await conexion.query(sql,[nombre,apellido,correoElectronico,contrasenia,imagen]);

        if(result.affectedRows === 0){
            return res.status(404),json({
                mensaje: "No se pudo crear."
            })
        }

        res.status(200).json({
            mensaje: "Empleado creado."
        });

    } catch (err) {
        res.status(500).json({
            mensaje:"Error interno."
        })
    }

}

// DELETE
export const deleteEmpleado = async (req, res) => {
    try{
        const {idUsuario} = req.params;

        const sql = "UPDATE `usuarios` SET activo = 0 WHERE idUsuario = ? AND idTipoUsuario = 2";

        const [result] = await conexion.query(sql, idUsuario);

        if(result.affectedRows === 0){
            return res.status(404),json({
                mensaje: "No se pudo modificar."
            })
        }

        res.status(200).json({
            mensaje: "Empleado eliminado."
        });

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
}