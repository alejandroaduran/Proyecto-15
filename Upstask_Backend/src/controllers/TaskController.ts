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

    static getProjectTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate("project")
            res.json(tasks)
            console.log(tasks)
        } catch (error) {
            res.status(500).json({ error: "Error getting tasks" })
        }
    }

    static getTaskById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                const error = new Error("Task not found")
                res.status(404).json({ error: error.message })
            }
            if (task.project.toString() !== req.project.id) {
                const error = new Error("Not valid action")
                res.status(400).json({ error: error.message })
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({ error: "Error getting tasks" })

        }
    }

    static updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error("Task not found");
                res.status(404).json({ error: error.message });
                return;
            }
            if (task.project.toString() !== req.project.id) {
                const error = new Error("Not valid action");
                res.status(400).json({ error: error.message });
                return;
            }
            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.json({ message: "Task updated", task });
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    }

    static deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId, req.body);
            if (!task) {
                const error = new Error("Task not found");
                res.status(404).json({ error: error.message });
                return;
            }
            if (task.project.toString() !== req.project.id) {
                const error = new Error("Not valid action");
                res.status(400).json({ error: error.message });
                return;
            }
            req.project.tasks = req.project.tasks.filter((task: any) => task.toString() !== taskId)

            await Promise.allSettled([task.deleteOne(), req.project.save()])

            res.json({ message: "Task deleted", task });
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    }

    static updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                const error = new Error("Task not found");
                res.status(404).json({ error: error.message });
            }
            const { status } = req.body
            task.status = status
            await task.save()
            res.send("Status updated")

        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }

    }
}