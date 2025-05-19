import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";


declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        console.log(task);
        if (!task) {
            const error = new Error("task not found");
            res.status(404).json({ error: error.message })
            return
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ error: "Error validating task" })
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    // Compare with req.project.id or req.project._id
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error("Not valid action");
        res.status(400).json({ error: error.message });
        return;
    }
    next();
}