import { Router } from 'express';
import * as oficinasController from '../controller/oficinasController.js';

const router = Router();

router.get('/oficinas', oficinasController.getAllOficinas);
router.get('/oficinas/:idOficina', oficinasController.getOficinasById);
router.patch('/oficinas/:idOficina', oficinasController.updateOficinas);
router.post('/oficinas', oficinasController.createOficinas);
router.delete('/oficinas/:idOficina', oficinasController.deleteOficinas);

export default router;