import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { setupSwagger } from './utils/swagger';

dotenv.config();
const app = express();

// Configuración básica primero
app.use(express.json());

// CORS para todas las rutas EXCEPTO /api-docs
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) {
    return next();
  }
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })(req, res, next);
});

// Swagger 
setupSwagger(app);

// Rutas de la aplicación
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
  console.log('Conectado a la base de datos');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  });
}).catch(error => console.log('Error al conectar a la base de datos:', error));