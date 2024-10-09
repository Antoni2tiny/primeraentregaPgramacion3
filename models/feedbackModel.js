// Importamos los tipos de datos de Sequelize
const { DataTypes } = require('sequelize');

// Importamos la instancia de la base de datos desde la configuración
const db = require('../config/database');

// Definimos el modelo 'Feedback', que representará la tabla de retroalimentación en la base de datos
const Feedback = db.define('Feedback', {
    // Definimos la columna 'clientId', que hace referencia al ID del cliente que envía el feedback
    clientId: {
        type: DataTypes.INTEGER,  // El tipo de dato es un entero
        allowNull: false,         // El campo es obligatorio (no puede ser nulo)
    },
    // Definimos la columna 'description', que almacena la descripción o contenido del feedback
    description: {
        type: DataTypes.STRING,   // El tipo de dato es una cadena de texto (string)
        allowNull: false,         // El campo es obligatorio (no puede ser nulo)
    },
    // Definimos la columna 'status', que guarda el estado del feedback
    status: {
        type: DataTypes.STRING,   // El tipo de dato es una cadena de texto
        defaultValue: 'Pending',  // El valor por defecto será 'Pending' (pendiente)
    },
});

// Exportamos el modelo 'Feedback' para que pueda ser utilizado en otras partes de la aplicación
module.exports = Feedback;

