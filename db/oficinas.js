import { conexion } from "./conexion.js";

export default class Oficinas{

    buscarTodos = async (limit = 0, offset = 0) => {
        
        const sql = "SELECT * FROM `oficinas`";

        if(limit){
            sql += ' LIMIT ? OFFSET ? ';
        }

        const [result] = await conexion.query(sql, [limit, offset]);
        return result;
    
    }

    buscarPorId = async (idOficina) => {
            
        const sql = "SELECT * FROM `oficinas` WHERE activo = 1 AND idOficina = ?";
        
        const [result] = await conexion.query(sql, idOficina);
        
        return (result.length > 0 ) ? result[0] : null;

    }

    crear = async ({nombre, idReclamoTipo}) => {
        const sql = "INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,1)";
            
        const [result] = await conexion.query(sql,[nombre,idReclamoTipo]);

        if (result.affectedRows === 0) {
            return false;
        }

        return this.buscarPorId(result.insertId);
    }

    modificar = async (idOficina, datos) => {
            
        const sql = "UPDATE oficinas SET ? WHERE idOficina = ?";
        
        const [result] = await conexion.query(sql, [datos, idOficina]);
        
        if(result.affectedRows === 0){
            return false;
        }           
        
        return true;
    }

    eliminar = async (idOficina) => {
        const sql = "UPDATE `oficinas` SET activo = 0 WHERE idOficina = ?";
            
        const [result] = await conexion.query(sql,idOficina);

        if(result.affectedRows === 0){
            return false;
        }  
        return true;
    }
    
    agregarEmpleados = async ({idOficina, empleados}) => {
        let agregados = 0;
        try{
            // iniciar transacción
            await conexion.beginTransaction();

            // por cada empleado hacer insert, aumentar agregados
            for (const empleado of empleados){
                const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?,?, 1);`;
                const result = conexion.query(sql, [empleado.idUsuario, idOficina]);
                agregados += 1;
            }

            // confirmar transacción
            await conexion.commit();

            // return respuesta
            return {estado: true, mensaje: `se agergaron ${agregados} empleados `};

        }catch (error){
            // revierto la transacción en caso de error.
            await conexion.rollback();
            console.log(error)
            return { estado: false, mensaje: 'Error al agergar empleados a la oficina.' };
        }
    }
}