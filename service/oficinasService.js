import Oficinas from "../db/oficinas.js";

export default class OficinasService {

    constructor(){
        this.oficinas = new Oficinas();
    }

    buscarTodos = (limit,offset) => {
        return this.oficinas.buscarTodos(limit,offset);
    }

    buscarPorId = (idOficina) => {
        return this.oficinas.buscarPorId(idOficina);
    }
    
    crear = async (oficina) => {
        const oficinaCreada = await this.oficinas.crear(oficina);
        if (!oficinaCreada) {
            return {estado: false, mensaje:"Oficina no creada"};
        }
        return {estado: true, mensaje: "Oficina creada", data: oficinaCreada};
    }

    modificar = async (idOficina, datos) => {
        const existe = await this.oficinas.buscarPorId(idOficina);

        if (existe === null) {
            return {estado: false, mensaje: "idOficina no existe."}
        }

        await this.oficinas.modificar(idOficina, datos);
        return {estado: true, mensaje:"Oficina modificada."}
    }

    eliminar = async (idOficina) => {
        const existe = await this.oficinas.buscarPorId(idOficina);

        if (existe === null) {
            return {estado: false, mensaje: "idOficina no existe."}
        }

        await this.oficinas.eliminar(idOficina);
        return {estado: true, mensaje:"Oficina eliminada."}
    }

    agregarEmpleados = async (oficinaEmpleados) => {
        // podria controlar 
        // si los empleados existen
        // si los empleados ya no estan en la relacion con la oficina (activo 1)
        
        return await this.oficinas.agregarEmpleados(oficinaEmpleados);
    }
}