import type { Request, Response } from "express";
import Task from "../models/Task";


export class TaskController {
    static createTask = async (req: Request, res: Response): Promise<void> => {

        try {
            const task = new Task(req.body);
            //console.log(task);
            task.project = req.project.id // Assign the project ID to the task
            req.project.tasks.push(task.id); // Add the task ID to the project's tasks array
            /*             await task.save();
                        await req.project.save(); // Save the project with the new task ID */
            await Promise.allSettled([task.save(), req.project.save()])
            res.send("Task created successfully");

        } catch (error) {
            console.log("Error creating task:", error);
        }
    }
}