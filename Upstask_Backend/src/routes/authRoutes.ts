import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { body , param} from 'express-validator';
import { handleInputErrors } from '../middleware/validation';

const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body("passwordConfirmation").custom((value, { req }) => {
        // console.log("Validating password confirmation", value, req.body.password);
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createAccount)

router.post("/confirm-account",
    body("token").notEmpty().withMessage("Token is required"),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post("/login",
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    handleInputErrors,
    AuthController.login
)

router.post("/request-code",
    body("email").isEmail().withMessage("Invalid email format"),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post("/forgot-password",
    body("email").isEmail().withMessage("Invalid email format"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post("/validate-token",
    body("token").notEmpty().withMessage("Token is required"),
    handleInputErrors,
    AuthController.validateToken
)

router.post("/update-password/:token",
    param("token").isNumeric().withMessage("Token must be a number"),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body("passwordConfirmation").custom((value, { req }) => {
        // console.log("Validating password confirmation", value, req.body.password);
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

export default router
