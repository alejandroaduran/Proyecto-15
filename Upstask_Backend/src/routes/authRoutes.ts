import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { body } from 'express-validator';
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

export default router
