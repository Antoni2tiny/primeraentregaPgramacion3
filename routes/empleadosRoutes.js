import { Router } from "express";
import * as empleadosController from '../controller/empleadosController.js';

const router = Router();

router.get('/empleados', empleadosController.getAllEmpleados);
router.get('/empleados/:idUsuario', empleadosController.getEmpleadoById);
router.patch('/empleados/:idUsuario', empleadosController.updateEmpleadosById);
router.post('/empleados', empleadosController.createEmpleado);
router.delete('/empleados/:idUsuario', empleadosController.deleteEmpleado);

export default router;