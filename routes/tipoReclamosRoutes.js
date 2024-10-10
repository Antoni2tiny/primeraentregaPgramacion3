import { Router } from 'express';
import * as tipoReclamosController from '../controller/tipoReclamosController.js';

const router = Router();

router.get('/tipos-reclamos', tipoReclamosController.getAllTiposReclamos);
router.get('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.getReclamosTipoById);
router.patch('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.updateReclamosTipoById);
router.post('/tipos-reclamos', tipoReclamosController.createTiposReclamos);
router.delete('/tipos-reclamos/:idReclamosTipo', tipoReclamosController.deleteTiposReclamoso);

export default router;