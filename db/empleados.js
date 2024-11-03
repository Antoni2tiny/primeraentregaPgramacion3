import conexion from "./conexion.js";

export default class Empleados{
    
    buscarTodos = async (limit=0, offset=0) => {

        const sql = "SELECT * FROM `usuarios` WHERE idTipoUsuario = 2";

        if (limit) {
            sql += ' LIMIT ? OFFSET ?';
        }

        const [result] = await conexion.query(sql,[limit,offset]);

        return result;
    }

    buscarPorId = async (idUsuario) => {

        const sql = "SELECT * FROM `usuarios` WHERE idTipoUsuario = 2 AND idUsuario = ?";

        const [result] = await conexion.query(sql, idUsuario);

        return (result.length > 0 ) ? result[0] : null;
    }

    crear = async (datos) => {

        const sql = "INSERT INTO `usuarios` (nombre,apellido,correoElectronico,contrasenia,idTipoUsuario,imagen) VALUES (?,?,?,?,2,?)";

        try {
            const [result] = await conexion.query(sql,[datos.nombre,
                datos.apellido,
                datos.correoElectronico,
                datos.contrasenia,
                datos.imagen
            ]);
    
            if (result.affectedRows === 0) {
                return false;
            }
    
            return this.buscarPorId(result.insertId);
            
        } catch (error) {
            console.log(error);
        }
    }

    modificar = async (idUsuario, datos) => {
        
        // const sql = "UPDATE `usuarios` SET nombre = ?, apellido = ?, correoElectronico = ?, contrasenia = ?,imagen = ? WHERE idUsuario = ? AND idTipoUsuario = 2 ";
        const sql = "UPDATE `usuarios` SET ? WHERE idUsuario = ? AND idTipoUsuario = 2 ";

        const [result] = await conexion.query(sql, [datos,idUsuario]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }

    eliminar = async (idUsuario) => {
        const sql = "UPDATE `usuarios` SET activo = 0 WHERE idUsuario = ? AND idTipoUsuario = 2";
            
        const [result] = await conexion.query(sql,idUsuario);

        if(result.affectedRows === 0){
            return false;
        }  
        return true;
    }
}