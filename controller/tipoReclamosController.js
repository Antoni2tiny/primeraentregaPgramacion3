import TiposReclamosService from "../service/tiposReclamosService.js";

export default class TiposReclamosController{

    constructor(){
        this.TiposReclamosService = new TiposReclamosService();
    }

    buscarTodos = async (req, res) => {
        
        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            let plimit = limit ? Number(limit) : 0;
            let poffset = offset ? Number(offset) : 0;

            const tiposReclamos = await this.TiposReclamosService.buscarTodos(plimit,poffset);
    
            res.status(200).json(tiposReclamos);
    
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    };
    
    buscarPorId = async (req, res) => {
        const idReclamosTipo = req.params.idReclamosTipo;

        if (idUsuario === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Faltan datos obligatorios."
            })
        }

        try {
        
            const reclamoTipo = await this.TiposReclamosService.buscarPotId(idReclamosTipo);
    
            if (reclamoTipo.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontró tipo reclamo."
                });
            }
    
            res.status(200).json(reclamoTipo);
        } catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    };
    
    modificar = async (req, res) => {
        try {
            const idReclamosTipo = req.params.idReclamosTipo;
    
            if (idReclamosTipo === undefined) {
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
    
            const tipoReclamoModoficado = await this.TiposReclamosService.modificar(idReclamosTipo,datos);
    
            if (tipoReclamoModoficado.estado) {
                res.status(200).send({
                    estado: "OK",
                    mensaje: tipoReclamoModoficado.mensaje
                });
            }else{
                res.status(404).send({
                    estado: "Falla",
                    mensaje: tipoReclamoModoficado.mensaje
                });
            }
    
        }catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }
    
    crear = async (req,res) => {
    
        const {descripcion} = req.body;
    
        if(!descripcion) {
            return res.status(400).json({
                mensaje:"Se requiere el campo descipcion."
            })
        }

        try {
            
            const tipoReclamo = {descripcion}

            const nuevoTipoReclamo = await this.TiposReclamosService.crear(tipoReclamo);
    
            if(nuevoTipoReclamo.affectedRows === 0){
                return res.status(404).json({
                    mensaje: "No se pudo crear."
                })
            }
    
            res.status(200).json({
                mensaje: "Tipo reclamo creado."
            });
    
        }catch (err) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    }
    
    eliminar = async (req, res) => {
        const idReclamosTipo = req.params.idReclamosTipo;
        if (idUsuario === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Falla datos obligatorios."
            })
        }

        try{
    
            const tipoReclamoEliminado = await this.TiposReclamosService.eliminar(idReclamosTipo);
    
            if (tipoReclamoEliminado.estado) {
                res.status(200).send({
                    esatado:"OK",
                    mensaje: tipoReclamoEliminado.mensaje
                });
            }else{
                res.status(404).send({
                    esatado:"Falla",
                    mensaje: tipoReclamoEliminado.mensaje
                })
            }
            
    
        }catch(err){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    }
}