import Empleados from "../db/empleados.js";

export default class EmpleadosService {

    constructor(){
        this.empleados = new Empleados();
    }

    buscarTodos = (limit,offset) => {
        return this.empleados.buscarTodos(limit,offset);
    }

    buscarPotId = (idUsuario) => {
        return this.empleados.buscarPorId(idUsuario);
    }

    crear = async (usuario) => {
        const empleadoCreado = await this.empleados.crear(usuario);
        if (!empleadoCreado) {
            return {estado: false, mensaje: "Empleado no creado."};
        }
        return {estado: true, mensaje: "Empleado creado", data: empleadoCreado};
    }

    modificar = async (idUsuario, datos) => {
        const existe = await this.empleados.buscarPorId(idUsuario);

        if (existe === null) {
            return {estado: false, mensaje: "Empleado no existe."}
        }

        await this.empleados.modificar(idUsuario, datos);
        return {estado: true, mensaje:"Empleado modificada."}
    }

    eliminar = async (idUsuario) => {
        const existe = await this.empleados.buscarPorId(idUsuario);

        if (existe === null) {
            return {estado: false, mensaje: "idUsuario no existe."}
        }

        await this.empleados.eliminar(idUsuario);
        return {estado: true, mensaje:"Empleado eliminado."}
    }
}