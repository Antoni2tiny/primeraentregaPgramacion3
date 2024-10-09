const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackService'); //  rutas de gestión de reclamos
const db = require('./config/database'); //  configuración de la base de datos
const app = express();
const port = 3001;

// Configurar Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configurar carpetas públicas y de vistas
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Usar rutas de autenticación
app.use('/', authRoutes);

// Usar rutas de gestión de reclamos
app.use('/feedback', feedbackRoutes); // Añade esta línea para usar las rutas de reclamos

// Rutas adicionales
app.get('/', (req, res) => {
    res.render('home', { title: 'Inicio' });
});

app.get('/reclamos', (req, res) => {
    res.render('reclamos', { title: 'Reclamos' });
});

app.get('/oficinas', (req, res) => {
    res.render('oficinas', { title: 'Oficinas' });
});

app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin' });
});

// Prueba de conexión a la base de datos
db.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.log('Error al conectar a la base de datos: ', err));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

