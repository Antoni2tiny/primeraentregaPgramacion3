const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../bd/bd'); 

// Función para registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } = req.body;

  
  db.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [correoElectronico], async (err, results) => {
    if (err) return res.status(500).send('Error en la base de datos');
    if (results.length > 0) return res.status(400).send('Correo ya en uso');

   
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    
    db.query('INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario) VALUES (?, ?, ?, ?, ?)', 
      [nombre, apellido, correoElectronico, hashedPassword, idTipoUsuario], (err) => {
      if (err) return res.status(500).send('Error al registrar usuario');
      res.status(201).send('Usuario registrado con éxito');
    });
  });
};

// Función para iniciar sesión y generar el token JWT
const iniciarSesion = (req, res) => {
  const { correoElectronico, contrasenia } = req.body;
  

  // Buscar al usuario por su correo electrónico
  db.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [correoElectronico], async (err, results) => {
    if (err) return res.status(500).send('Error en la base de datos');
    if (results.length === 0) return res.status(400).send('Correo o contraseña incorrectos');

    const usuario = results[0];

    // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
    const esContraseñaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!esContraseñaValida) return res.status(400).send('Correo o contraseña incorrectos');

    // Generar un token JWT
    const token = jwt.sign({ idUsuario: usuario.idUsuario, idTipoUsuario: usuario.idTipoUsuario }, 'secret_key', { expiresIn: '1h' });
    
    if (!usuario === 0) return res.status(200).send('Usuario logiado correctamente')
    res.json({ token });
  });
};

module.exports = { registrarUsuario, iniciarSesion };
