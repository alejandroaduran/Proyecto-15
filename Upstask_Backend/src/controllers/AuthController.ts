import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmails";


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

            //Generate a confirmation token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            //send email
            AuthEmail.sendConfirmationEmail(
                {
                    email: String(user.email),
                    name: String(user.email),
                    token: String(token.token)
                }
            )

            await Promise.allSettled([user.save(), token.save()]);
            res.send("Account created successfully! check your email to confirm your account.");

        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the account." });
        }
    }
    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            console.log("Confirming account with token:", token);
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                res.status(400).json({ error: "Invalid or expired token." });
                return
            }

            // If token is valid, find the user and activate the account
            const user = await User.findById(tokenExists.user);
            if (!user) {
                res.status(404).json({ error: "User not found." });
                return
            }
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send("Account confirmed successfully!");

        } catch (error) {
            res.status(500).json({ error: "An error occurred while confirming the account." });
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            //res.send("Logging in...");
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("User not found.");
                res.status(404).json({ error: error.message });
                return;
            }
            const isValidPassword = await checkPassword(password, user.password.toString());
            if (!isValidPassword) {
                const error = new Error("Invalid email or password.");
                res.status(401).json({ error: error.message });
                return;
            }
            if (!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save();
                AuthEmail.sendConfirmationEmail(
                    {
                        email: String(user.email),
                        name: String(user.name),
                        token: String(token.token)
                    }
                )

                const error = new Error("Account not confirmed. An email has been sent to confirm your account.");
                res.status(403).json({ error: error.message });
                return;
            }
            res.send("Login successful!");
        } catch (error) {
            res.status(500).json({ error: "An error occurred while logging in." });
        }

    }

        static requestConfirmationCode = async (req: Request, res: Response) => {
        //    res.send("Creating account...");
        try {
            const { email } = req.body;

            // Check if the user already exists
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("User not found.");
                res.status(404).json({ error: error.message });
                return;
            }

            if( user.confirmed) {
                const error = new Error("User already confirmed.");
                res.status(403).json({ error: error.message });
                return;
            }

            //Generate a confirmation token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            //send email
            AuthEmail.sendConfirmationEmail(
                {
                    email: String(user.email),
                    name: String(user.name),
                    token: String(token.token)
                }
            )

            await Promise.allSettled([user.save(), token.save()]);
            res.send("Token sent! check your email to confirm your account.");

        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the account." });
        }
    }
}