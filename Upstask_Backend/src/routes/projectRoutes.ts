import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";


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

//Routes for tasks
router.param("projectId", validateProjectExists) //permite ejecutar validateProjectExists en cada ruta que tenga el parametro projectId

router.post("/:projectId/tasks",
    body("name")
        .notEmpty().withMessage("task name is required"),
    body("description")
        .notEmpty().withMessage("task description is required"),
    handleInputErrors,
    TaskController.createTask
)

router.get("/:projectId/tasks",
    TaskController.getProjectTasks
)

router.get("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid project ID"),
    handleInputErrors,
    TaskController.getTaskById
)

router.put("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid project ID"),
    body("name")
        .notEmpty().withMessage("task name is required"),
    body("description")
        .notEmpty().withMessage("task description is required"),
    handleInputErrors,
    TaskController.updateTask
)

router.delete("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid project ID"),
    handleInputErrors,
    TaskController.deleteTask
)

router.post("/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("Invalid project ID"),
    body("status")
    .notEmpty().withMessage("state is required"),
    handleInputErrors,
    TaskController.updateStatus
)

export default router