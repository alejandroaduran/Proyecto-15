import { Request, Response } from "express"
import Project from "../models/Project"
import { isDataView } from "node:util/types"


export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        //console.log(req.body)
        const project = new Project(req.body)

        //Assign the user who created the project as the manager
        project.manager = req.user.id

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
            const projects = await Project.find({
                $or: [
                    { manager: { $in: req.user.id } }, // Projects where the user is the manager
                    //{ collaborators: { $in: req.user.id } } // Projects where the user is a collaborator
                ]
            })
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
            const project = await (await Project.findById(id)).populate("tasks")

            if (!project) {
                const error = new Error("Project not found")
                res.status(400).json({ error: error.message })
            }

            if(project.manager.toString()!== req.user.id) {
                const error = new Error("Invalid Action")
                res.status(403).json({ error: error.message })
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
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error("Project not found")
                res.status(400).json({ error: error.message })
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description

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