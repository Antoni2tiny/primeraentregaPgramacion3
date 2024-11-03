import { Router } from "express";
import EmpleadosControlle from "../controller/empleadosController.js";

const router = Router();

const empleadosController = new EmpleadosControlle();

router.get('/empleados', empleadosController.buscarTodos);
router.get('/empleados/:idUsuario', empleadosController.buscarPorId);
router.patch('/empleados/:idUsuario', empleadosController.modificar);
router.post('/empleados', empleadosController.crearEmpleado);
router.delete('/empleados/:idUsuario', empleadosController.eliminar);

export default router;