import { Task } from "../models/task";
import { TaskService } from "../services/taskService";
import { taskType } from "../types";



const taskService = new TaskService();

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create task' });
    }
};