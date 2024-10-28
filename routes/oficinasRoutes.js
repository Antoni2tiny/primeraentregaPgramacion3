import { Router } from 'express';
import OficinasControlle from '../controller/oficinasController.js';

const router = Router();

const oficinasController = new OficinasControlle();

router.get('/oficinas', oficinasController.buscarTodos);
router.get('/oficinas/:idOficina', oficinasController.buscarPorId);
router.patch('/oficinas/:idOficina', oficinasController.modificar);
router.post('/oficinas', oficinasController.crear);
router.delete('/oficinas/:idOficina', oficinasController.eliminar);
router.post('/agregar-empleados', oficinasController.agregarEmpleados);

export default router;