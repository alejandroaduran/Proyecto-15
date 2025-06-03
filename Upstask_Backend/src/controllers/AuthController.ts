import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        //    res.send("Creating account...");
        try {
            const { password, email } = req.body;

            // Check if the user already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error("User already exists.");
                res.status(409).json({ error: error.message });
                return;
            }

            //Create user
            const user = new User(req.body);

            //Hash the password
            user.password = await hashPassword(password);

            await user.save();
            res.send("Account created successfully! check your email to confirm your account.");

        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the account." });
        }
    }
}