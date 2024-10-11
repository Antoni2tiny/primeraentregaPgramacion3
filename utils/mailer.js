const nodemailer = require('nodemailer'); // Usando require para nodemailer
const { handlebars } = require('nodemailer-express-handlebars');
const path = require('path'); // Usando require para path
require('dotenv').config();



// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Configuración del motor de plantillas Handlebars para Nodemailer
transporter.use('compile', handlebars({
    viewEngine: {
        extname: '.hbs', // Extensión de archivo
        layoutsDir: path.resolve(__dirname, 'views/layouts/'), // Ruta a las plantillas
        defaultLayout: false, // No usaremos un layout por defecto en este caso
        partialsDir: path.resolve(__dirname, 'views/partials/') // Opcional, por si tienes parciales
    },
    viewPath: path.resolve(__dirname, 'views/emails/'), // Ruta a las plantillas de correo
    extName: '.hbs'
}));

// Función para enviar correos con plantilla
const enviarCorreo = (to, subject, cambioDeEstado, context) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        template: cambioDeEstado, // Nombre de la plantilla
        context // Datos dinámicos que pasarás a la plantilla
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = {enviarCorreo};
