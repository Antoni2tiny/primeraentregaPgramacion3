import OficinasService from "../service/oficinasService.js";

export default class OficinasControlle{

    constructor(){
        this.OficinasService = new OficinasService();
    }

    
    buscarTodos = async (req, res) => {

        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            let plimit = limit ? Number(limit) : 0;
            let poffset = offset ? Number(limit) : 0;

            const oficinas = await this.OficinasService.buscarTodos(plimit,poffset);
            
            res.status(200).json(oficinas);
                
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idOficina = req.params.idOficina;

        if (idOficina === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Faltan datos obligatorios."
            })        
        }

        try{
            
            const oficina = await this.OficinasService.buscarPorId(idOficina);
            
            if (oficina.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontró oficina."
                });
            }
            
            res.status(200).json(oficina);
            
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno.",
                error: err.message
            });
        }
    }

    modificar = async (req, res) => {
        try{
            const idOficina = req.params.idOficina;
            if (idOficina === undefined) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje:"Falla datos obligatorios."
                })
            }
            
            const datos = req.body;

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje:"No se enviaron datos para ser modificados."
                });
            }
             
            const oficinaModificada = await this.OficinasService.modificar(idOficina,datos);
            
            if (oficinaModificada.estado) {
                res.status(200).send({
                    esatado:"OK",
                    mensaje: oficinaModificada.mensaje
                });
            }else{
                res.status(404).send({
                    esatado:"Falla",
                    mensaje: oficinaModificada.mensaje
                });
            }
        }catch{
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }

    crear = async (req, res) => {
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

        try {
            const oficina = {
                nombre,
                idReclamoTipo
            }
            
            const nuevaOficina = await this.OficinasService.crear(oficina);
            
            if (nuevaOficina.estado) {
                res.status(201).send({
                    esatado:"OK", data: nuevaOficina.data
                });
            }else{
                res.status(404).send({estado:"Falla", mensaje:nuevaOficina.mensaje});
            }
            
        } catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }

    eliminar = async (req,res) => {
        const idOficina = req.params.idOficina;
        if (idOficina === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Falla datos obligatorios."
            })
        }

        try {
            
            const oficinaEliminada = await this.OficinasService.eliminar(idOficina);
            
            if (oficinaEliminada.estado) {
                res.status(200).send({
                    esatado:"OK",
                    mensaje: oficinaEliminada.mensaje
                });
            }else{
                res.status(404).send({
                    esatado:"Falla",
                    mensaje: oficinaEliminada.mensaje
                })
            }
            
        } catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }

    agregarEmpleados = async (req, res) => {
        const { idOficina, empleados } = req.body;
        
        if (!idOficina) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            })
        }

        if (empleados.length === 0) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            })
        }

        try{
            const oficinaEmpleados = {
                idOficina, 
                empleados
            }

            const nuevoOficinaEmpleados = await this.service.agregarEmpleados(oficinaEmpleados);
            
            if (nuevoOficinaEmpleados.estado){
                res.status(200).send({estado:"OK", mensaje: nuevoOficinaEmpleados.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: nuevoOficinaEmpleados.mensaje});
            }
        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    
}