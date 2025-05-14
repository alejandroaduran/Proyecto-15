import { Request, Response } from "express"
import Project from "../models/Project"


export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        //console.log(req.body)
        const project = new Project(req.body)

        try {

            await project.save()
            res.send("new project created")

        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            //res.send("Send - Get all projects")
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching projects" })
        }
    }

    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        //console.log(req.params)
        const { id } = req.params
        //console.log(id)
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error("Project not found")
                res.status(400).json({ error: error.message })
            }

            res.json(project)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching project" })
        }
    }

    static updateProject = async (req: Request, res: Response): Promise<void> => {
        //console.log(req.params)
        const { id } = req.params
        //console.log(id)
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                const error = new Error("Project not found")
                res.status(400).json({ error: error.message })
            }

            await project.save()
            res.send("Project updated")

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error fetching project" })
        }
    }

    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        console.log(id)
        try {
            const project = await Project.findById(id)
            //console.log(project)
            if (!project) {
                const error = new Error("Project not found")
                res.status(400).json({ error: error.message })
            }
            await project.deleteOne()
            res.send("Project deleted")

        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Error deleting project" })
        }
    }
}