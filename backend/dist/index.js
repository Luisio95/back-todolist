"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const swagger_1 = require("./utils/swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuración básica primero
app.use(express_1.default.json());
// CORS para todas las rutas EXCEPTO /api-docs
app.use((req, res, next) => {
    if (req.path.startsWith('/api-docs')) {
        return next();
    }
    (0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })(req, res, next);
});
// Swagger 
(0, swagger_1.setupSwagger)(app);
// Rutas de la aplicación
app.use('/auth', authRoutes_1.default);
app.use('/api', taskRoutes_1.default);
const PORT = process.env.PORT || 3001;
database_1.default.sync({ force: false }).then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
        console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
}).catch(error => console.log('Error al conectar a la base de datos:', error));
