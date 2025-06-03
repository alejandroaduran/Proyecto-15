import type { Request, Response } from "express";
import User from "../models/User";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        //    res.send("Creating account...");
        try {
            const user = new User(req.body)
            await user.save()
            res.send("Account created successfully! check your email to confirm your account.");

        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the account." });
        }
    }
}