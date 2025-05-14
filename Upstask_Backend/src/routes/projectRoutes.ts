import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";


const router = Router()

// Create a new project
router.post("/",
    body("projectName")
        .notEmpty().withMessage("Project name is required"),
    body("clientName")
        .notEmpty().withMessage("client name is required"),
    body("description")
        .notEmpty().withMessage("description is required"),
    handleInputErrors,
    ProjectController.createProject
)

// Get all projects
router.get("/", ProjectController.getAllProjects)

// Get project by ID
router.get("/:id",
    param("id").isMongoId().withMessage("Invalid project ID"),
    handleInputErrors,
    ProjectController.getProjectById
)

// Update project by ID
router.put("/:id",
    param("id").isMongoId().withMessage("Invalid project ID"),
    body("projectName")
        .notEmpty().withMessage("Project name is required"),
    body("clientName")
        .notEmpty().withMessage("client name is required"),
    body("description")
        .notEmpty().withMessage("description is required"),
    handleInputErrors,
    ProjectController.updateProject
)

// Delete project by ID
router.delete("/:id",
    param("id").isMongoId().withMessage("Invalid project ID"),
    handleInputErrors,
    ProjectController.deleteProject
)

export default router