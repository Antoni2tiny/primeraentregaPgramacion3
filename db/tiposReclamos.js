import conexion from "./conexion.js";

export default class TiposReclamos{

    buscarTodos = async (limit=0, offset=0) => {

        const sql = "SELECT * FROM reclamos_tipo WHERE activo = 1";

        if (limit) {
            sql += ' LIMIT ? OFFSET ?';
        }

        const [result] = await conexion.query(sql, [limit,offset]);

        return result;
    }

    buscarPorId = async (idReclamosTipo) => {
        const sql = 'SELECT * FROM reclamos_tipo WHERE activo = 1 AND idReclamosTipo = ?;'; 

        const [result] = await conexion.query(sql, idReclamosTipo);

        return (result.length > 0 ) ? result[0] : null;
    }

    crear = async (datos) => {

        const sql = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, 1);';

        try {
            const [result] = await conexion.query(sql,[datos.descripcion]);
    
            if (result.affectedRows === 0) {
                return false;
            }
    
            return this.buscarPorId(result.insertId);
            
        } catch (error) {
            console.log(error);
        }
    
    }

    modificar = async (idReclamosTipo, datos) => {

        // const sql = 'UPDATE reclamos_tipo SET descripcion = ? , activo = ?  WHERE idReclamosTipo = ?';
        const sql = 'UPDATE reclamos_tipo SET ? WHERE idReclamosTipo = ?';

        const [result] = await conexion.query(sql, [datos,idReclamosTipo]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }

    eliminar = async (idReclamosTipo) => {
        const sql = "UPDATE `reclamos_tipo` SET activo = 0 WHERE idReclamosTipo = ?";
            
        const [result] = await conexion.query(sql,idReclamosTipo);

        if(result.affectedRows === 0){
            return false;
        }  
        return true;
    }
}