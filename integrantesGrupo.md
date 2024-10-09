
******************************* 
*******************************
**  Agostini Antonio Alberto **
**  Peralta Jose Javier      **
**  Almiron Ruben            **
**  Paczkowski Nahuel        **
*******************************
*******************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Tareas por cada integrante.

Antonio Agostini: Arquitecto de API y Gestión de Autenticación 

Responsabilidades: 
Diseñar la estructura de la API y definir los endpoints necesarios para la gestión de reclamos, 
usuarios, y oficinas. 
Implementar el sistema de autenticación y autorización utilizando JWT (JSON Web Tokens) 
para los tres perfiles de usuario: cliente, empleado y administrador. 
Crear la base de datos en MySQL y definir los modelos utilizando Sequelize para la conexión 
con la base de datos. 
Tareas Específicas: 
Base de Datos: 
Configurar la conexión a MySQL usando Sequelize. 
Crear modelos para Usuario, Reclamo, y Oficina en Sequelize. 
Autenticación: 
Implementar rutas para el registro y login de usuarios. 
Configurar middleware para verificar el token JWT y gestionar la autorización basada en roles. 
Endpoints: 
Definir y documentar los endpoints para autenticación y autorización.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Peralta Javier: Gestión de Reclamos y Funcionalidad de Clientes 

Responsabilidades: 
Implementar los endpoints relacionados con la gestión de reclamos (crear, consultar, 
actualizar y cancelar reclamos). 
Desarrollar la funcionalidad específica para los clientes, como la creación y consulta de 
reclamos. 
Implementar la lógica de notificaciones para informar a los clientes sobre los cambios en el 
estado de sus reclamos. 
Tareas Específicas: 
Endpoints de Reclamos: 
Crear rutas y controladores para crear, consultar, actualizar y cancelar reclamos. 
Funcionalidad de Clientes: 
Implementar la lógica para que los clientes puedan ver el estado y los detalles de sus reclamos. 
Configurar notificaciones para cambios en el estado de los reclamos. 
Pruebas: 
Realizar pruebas unitarias y de integración para asegurar que la funcionalidad de reclamos 
para clientes funciona correctamente. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Almiron Ruben: Gestión de Oficinas y Empleados 

Responsabilidades: 
Implementar los endpoints y la lógica para la gestión de oficinas y empleados (ABM o CRUD). 
Desarrollar los endpoints para que los empleados puedan listar y atender reclamos. 
Implementar la lógica para asegurar que solo los empleados de una oficina puedan finalizar 
reclamos de esa oficina. 
Tareas Específicas: 
Endpoints de Oficinas y Empleados: 
Crear rutas y controladores para gestionar oficinas (agregar, modificar, eliminar) y asignar 
empleados a oficinas. 
Implementar endpoints para que los empleados puedan listar y actualizar el estado de los 
reclamos. 
Restricciones de Finalización de Reclamos: 
Implementar la lógica para validar que solo los empleados de una oficina puedan finalizar los 
reclamos de esa oficina. 
Pruebas: 
Realizar pruebas unitarias y de integración para asegurar que la gestión de oficinas y 
empleados funciona como se espera. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Paczkowski Nahuel : Gestión Administrativa y Generación de Informes

Responsabilidades: 
Implementar los endpoints y la lógica para la gestión de tipos de reclamos, empleados y 
oficinas por parte de los administradores. 
Desarrollar la funcionalidad para ver estadísticas sobre los reclamos usando procedimientos 
almacenados en MySQL. 
Implementar la generación de informes en formato PDF/CSV sobre los reclamos. 
Tareas Específicas: 
Endpoints Administrativos: 
Crear rutas y controladores para gestionar tipos de reclamos, empleados y oficinas. 
Estadísticas y Reportes: 
Implementar procedimientos almacenados en MySQL para obtener información estadística. 
Configurar generación de informes en formatos PDF y CSV (puedes usar bibliotecas como 
pdfkit y csv-writer). 
Pruebas: 
Realizar pruebas unitarias y de integración para asegurar que la funcionalidad administrativa y 
de generación de informes funcione correctamente.