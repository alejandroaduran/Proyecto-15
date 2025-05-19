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

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
            return
        } catch (error) {
            res.status(500).json({ error: "Error getting tasks" })
            return
        }
    }

    static updateTask = async (req: Request, res: Response): Promise<void> => {
        try {

            if (req.task.project.toString() !== req.project.id) {
                const error = new Error("Not valid action");
                res.status(400).json({ error: error.message });
                return;
            }
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send("Task updated");
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    }

    static deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            req.project.tasks = req.project.tasks.filter((task: any) => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send("Task deleted")
        } catch (error) {
            res.status(500).json({ error: "Error deleting task" });
        }
    }

    static updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {

            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send("Status updated")

        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }

    }
}