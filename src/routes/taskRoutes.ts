

import express from 'express';
import { getAllTasks, createTask } from '../controllers/taskController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';

export const taskRoutes = express.Router();


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (Protected)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Task 1"
 */
/* taskRoutes.get("/", authenticateJWT, async (req, res) => {
        const tasks = await getAllTasks(req, res)}); */
    
taskRoutes.get("/", authenticateJWT,
            asyncHandler(async (req: express.Request, res: express.Response) => {
              /* const tasks = */ await getAllTasks(req, res);
            })
          );
        

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Post new task (Protected)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Task 1"
 */
taskRoutes.post('/', createTask); 
