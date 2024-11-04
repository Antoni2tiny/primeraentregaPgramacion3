import { Router } from 'express';
import TiposReclamosController from '../controller/tipoReclamosController';

const router = Router();

const tipoReclamosController = new TiposReclamosController();

router.get('/tipos-reclamos', tipoReclamosController.buscarTodos);
router.get('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.buscarPorId);
router.patch('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.modificar);
router.post('/tipos-reclamos', tipoReclamosController.crear);
router.delete('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.eliminar);

export default router;