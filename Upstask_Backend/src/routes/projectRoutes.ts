import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists, } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";


const router = Router()

router.use(authenticate) // Apply authentication middleware to all routes in this router

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

router.param("id", projectExists) //permite ejecutar projectExists en cada ruta que tenga el parametro Id

// Get project by ID
router.get("/:id",
 /*    param("id").isMongoId().withMessage("Invalid project ID"),
  */   handleInputErrors,
    ProjectController.getProjectById
)

// Update project by ID
router.put("/:id",
 /*    param("id").isMongoId().withMessage("Invalid project ID"),
  */   body("projectName")
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
 /*    param("id").isMongoId().withMessage("Invalid project ID"),
  */   handleInputErrors,
    ProjectController.deleteProject
)

//Routes for tasks
router.param("projectId", projectExists) //permite ejecutar validateProjectExists en cada ruta que tenga el parametro projectId
router.param("taskId", taskExists)
router.param("taskId", taskBelongsToProject)

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


//Routes for teams
router.post("/:projectId/team/find",
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.post("/:projectId/team",
    body("id")
        .notEmpty().withMessage("ID is required")
        .isMongoId().withMessage("Invalid ID format"),
    handleInputErrors,
    TeamMemberController.addMemberById
)

export default router