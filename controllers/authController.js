// Importamos la conexión a la base de datos y las funciones de autenticación
const db = require('../baseDatos');
const { hashPassword, verifyPassword, generateToken } = require('../autenticacion');

// Función para registrar un nuevo usuario
const registerUser = (req, res) => {
    // Extraemos los datos del cuerpo de la solicitud
    const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } = req.body;
    
    // Hash de la contraseña para almacenarla de forma segura
    const hashedPassword = hashPassword(contrasenia);

    // Consulta SQL para insertar un nuevo usuario en la base de datos
    const query = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario) VALUES (?, ?, ?, ?, ?)';
    
    // Ejecutamos la consulta
    db.query(query, [nombre, apellido, correoElectronico, hashedPassword, idTipoUsuario], (err, results) => {
        if (err) 
            // Si ocurre un error al registrar, enviamos una respuesta con el código 500
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        
        // Si el registro es exitoso, redirigimos al usuario a la página de inicio de sesión
        res.status(201).redirect('/login');
    });
};

// Función para iniciar sesión
const loginUser = (req, res) => {
    // Extraemos el correo electrónico y la contraseña del cuerpo de la solicitud
    const { correoElectronico, contrasenia } = req.body;

    // Consulta SQL para buscar al usuario por correo electrónico
    const query = 'SELECT * FROM usuarios WHERE correoElectronico = ?';
    
    // Ejecutamos la consulta
    db.query(query, [correoElectronico], (err, results) => {
        if (err) 
            // Si ocurre un error en la consulta, respondemos con el código 500
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        
        if (results.length === 0) 
            // Si no se encuentra un usuario con ese correo, respondemos con error 401 (no autorizado)
            return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0]; // Obtenemos los datos del usuario encontrado

        // Verificamos si la contraseña ingresada coincide con la almacenada
        if (!verifyPassword(contrasenia, user.contrasenia)) 
            // Si la contraseña no coincide, respondemos con error 401
            return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Si la verificación es exitosa, generamos un token para la sesión
        const token = generateToken(user);
        
        // Almacenamos el token en una cookie y redirigimos al usuario a la página principal
        res.cookie('token', token);
        res.redirect('/');
    });
};

// Exportamos las funciones para que puedan ser utilizadas en otras partes de la aplicación
module.exports = { registerUser, loginUser };

