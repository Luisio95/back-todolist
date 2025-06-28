"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const asyncHandlers_1 = require("../utils/asyncHandlers");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones con tareas
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Comprar leche"
 *         description:
 *           type: string
 *           example: "Comprar leche descremada en el supermercado"
 *         completed:
 *           type: boolean
 *           example: false
 *         userId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-20T14:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-20T14:30:00.000Z"
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Comprar leche"
 *         description:
 *           type: string
 *           example: "Comprar leche descremada en el supermercado"
 *         completed:
 *           type: boolean
 *           example: false
 *     TaskUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Comprar leche"
 *         description:
 *           type: string
 *           example: "Comprar leche descremada en el supermercado"
 *         completed:
 *           type: boolean
 *           example: true
 *   parameters:
 *     taskIdParam:
 *       in: path
 *       name: taskId
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID de la tarea
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 */
router.post('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.createTask));
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 */
router.get('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.getUserTasks));
/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.updateTask));
/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskIdParam'
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.deleteTask));
exports.default = router;
