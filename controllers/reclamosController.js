// Importamos la conexión a la base de datos
const db = require('../baseDatos');

const reclamosController = {
    // Método para mostrar la página de inicio
    mostrarInicio: (req, res) => {
        res.render('index', { title: 'Gestión de Reclamos' });
    },

    // Método para mostrar el formulario de carga de reclamos
    mostrarFormularioReclamos: (req, res) => {
        res.render('reclamos', { title: 'Cargar Reclamo' });
    },

    // Método para mostrar las oficinas
    mostrarOficinas: (req, res) => {
        res.render('oficinas', { title: 'Oficinas' });
    },

    // Método para procesar y guardar el reclamo en la base de datos
    procesarReclamo: (req, res) => {
        const { asunto, descripcion } = req.body;

        // Validamos que los campos no estén vacíos
        if (!asunto || !descripcion) {
            return res.status(400).json({ error: 'Por favor complete todos los campos.' });
        }

        // Consulta SQL para insertar el reclamo en la base de datos
        const query = 'INSERT INTO reclamos (asunto, descripcion, fecha) VALUES (?, ?, NOW())';
        
        // Ejecutamos la consulta y pasamos los datos del reclamo
        db.query(query, [asunto, descripcion], (err, result) => {
            if (err) {
                // En caso de error al guardar, respondemos con un mensaje de error
                return res.status(500).json({ error: 'Error al guardar el reclamo en la base de datos' });
            }
            // Si el reclamo se guarda correctamente, respondemos con éxito
            res.status(201).send('Reclamo procesado y guardado exitosamente');
        });
    }
};

module.exports = reclamosController;

