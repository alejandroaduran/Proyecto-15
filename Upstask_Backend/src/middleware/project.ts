import type { Request, Response, NextFunction } from "express";
import Project, { Iproject } from "../models/Project";

declare global{
    namespace Express {
        interface Request{
            project: Iproject
        }
    }
}

export async function projectExists(req: Request, res: Response, next: NextFunction) {
    try {
        // Support both :id and :projectId
        const projectId = req.params.projectId || req.params.id;
        const project = await Project.findById(projectId);
        console.log(project);
        if (!project) {
            const error = new Error("Project not found");
            res.status(404).json({ error: error.message });
            return; // <-- Add return to prevent calling next()
        }
        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error validating project" });
    }
}