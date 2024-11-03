import EmpleadosService from "../service/empleadosService.js";

export default class EmpleadosControlle{

    constructor(){
        this.EmpleadosService = new EmpleadosService();
    }

    buscarTodos = async (req,res) => {

        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            let plimit = limit ? Number(limit) : 0;
            let poffset = offset ? Number(offset) : 0;
            
            const empleados = await this.EmpleadosService.buscarTodos(plimit,poffset);
            
            res.status(200).json(empleados);
            
            }catch(err){
                res.status(500),json({
                mensaje: "Error interno."
            });
        }
    }

    buscarPorId = async (req,res) => {
        const idUsuario = req.params.idUsuario;

        if (idUsuario === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Faltan datos obligatorios."
            })
        }

        try{
            
            const empleado = await this.EmpleadosService.buscarPotId(idUsuario);
            
            if (empleado.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontró el empleado."
                });
            }
            
            res.status(200).json(empleado);
            
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }

    modificar = async (req,res) => {
        try{
            const idUsuario = req.params.idUsuario;
            if (idUsuario === undefined) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Falla datos obligatorios."
                })
            }
            const datos = req.body;
                
            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    esatado: "Falla",
                    mensaje: "Nose enviaron datos pra ser modificados."
                })
            }
            
            const empleadosModificado = await this.EmpleadosService.modificar(idUsuario,datos);

            if (empleadosModificado.estado) {
                res.status(200).send({
                    estado: "OK",
                    mensaje: empleadosModificado.mensaje
                });
            }else{
                res.status(404).send({
                    estado: "Falla",
                    mensaje: empleadosModificado.mensaje
                });
            }
            
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    }

     crearEmpleado = async (req,res) => {
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
        try {
            const empleado = {
                nombre,
                apellido,
                correoElectronico,
                contrasenia,
                imagen
            }

            const nuevoEmpleado = await this.EmpleadosService.crear(empleado);
            
            if (nuevoEmpleado.estado) {
                res.status(201).send({
                    estado: "OK", data: nuevoEmpleado.data
                });
            }else{
                res.status(404).send({estado: "Falla", mensaje:nuevoEmpleado.mensaje});
            }
            
        } catch (err) {
            res.status(500).json({
                mensaje:"Error interno."
            })
        }
        
    }

    eliminar = async (req, res) => {
        const idUsuario = req.params.idUsuario;
        if (idUsuario === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Falla datos obligatorios."
            })
        }

        try {
            
            const empleadoEliminada = await this.EmpleadosService.eliminar(idUsuario);
            
            if (empleadoEliminada.estado) {
                res.status(200).send({
                    esatado:"OK",
                    mensaje: empleadoEliminada.mensaje
                });
            }else{
                res.status(404).send({
                    esatado:"Falla",
                    mensaje: empleadoEliminada.mensaje
                })
            }
            
        } catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }
}