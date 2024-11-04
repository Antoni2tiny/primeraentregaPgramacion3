import TiposReclamos from "../db/tiposReclamos.js";

export default class TiposReclamosService {

    constructor(){
        this.tiposReclamos = new TiposReclamos();
    }

    buscarTodos = (limit,offset) => {
        return this.tiposReclamos.buscarTodos(limit,offset);
    }

    buscarPotId = (idReclamosTipo) => {
        return this.tiposReclamos.buscarPorId(idReclamosTipo);
    }

    crear = async (tiposReclamo) => {
        const tiposReclamoCreado = await this.tiposReclamos.crear(tiposReclamo);
        if (!tiposReclamoCreado) {
            return {estado: false, mensaje: "Tipo reclamo no creado."};
        }
        return {estado: true, mensaje: "Tipo reclamo creado", data: tiposReclamoCreado};
    }

    modificar = async (idReclamosTipo, datos) => {
        const existe = await this.tiposReclamos.buscarPorId(idReclamosTipo);

        if (existe === null) {
            return {estado: false, mensaje: "Tipo reclamo no existe."}
        }

        await this.tiposReclamos.modificar(idReclamosTipo, datos);
        return {estado: true, mensaje:"Tipo reclamo modificada."}
    }

    eliminar = async (idReclamosTipo) => {
        const existe = await this.tiposReclamos.buscarPorId(idReclamosTipo);

        if (existe === null) {
            return {estado: false, mensaje: "idReclamosTipo no existe."}
        }

        await this.tiposReclamos.eliminar(idReclamosTipo);
        return {estado: true, mensaje:"Tipo reclamo eliminado."}
    }
}