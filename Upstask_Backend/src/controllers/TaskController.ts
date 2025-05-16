import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response): Promise<void> => {

        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        console.log(project);
        if (!project) {
            const error = new Error("Project not found");
            res.status(404).json({ error: error.message })
        }
        try {
            const task = new Task(req.body);
            //console.log(task);
            task.project = project.id // Assign the project ID to the task
            project.tasks.push(task.id); // Add the task ID to the project's tasks array
            await task.save();
            await project.save(); // Save the project with the new task ID
            res.send("Task created successfully");

        } catch (error) {
            console.log("Error creating task:", error);
        }
    }
}