// Importamos el módulo 'mysql2' para conectarnos a la base de datos MySQL
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_reclamo' 
});

// Intentamos conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err.stack);
        return;
    }
    // Si la conexión es exitosa, mostramos el ID del hilo de conexión
    console.log('Conectado a la base de datos con el ID', connection.threadId);
});

