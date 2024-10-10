import express, { json } from 'express';
import dotenv from 'dotenv';
import tipoReclamosRoutes from './routes/tipoReclamosRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import oficinasRoutes from './routes/oficinasRoutes.js';

dotenv.config();

const app = express();

// app.get('/', (req, res) => {
//     res.status(200).send('Todo Ok');
// })

app.use(express.json());

app.use('/api', tipoReclamosRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', oficinasRoutes);

const puerto = process.env.puerto;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});