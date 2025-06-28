import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, title } = req.body;
    const userId = req.user?.id; 

    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { description, title,  completed } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
