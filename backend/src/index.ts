import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { setupSwagger } from './utils/swagger';

dotenv.config();
const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Swagger
setupSwagger(app);

// Rutas
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;

// Inicialización segura
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a BD exitosa');
    
    await sequelize.sync({ alter: true }); // O { force: false } en producción
    console.log('Modelos sincronizados');

    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error de inicio:', error);
    process.exit(1);
  }
}

startServer();
