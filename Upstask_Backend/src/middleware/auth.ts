import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Add user property to Request interface 
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error("Authorization header is missing")
        res.status(401).json({ error: error.message })
        return
    }

    const token = bearer.split(" ")[1]

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        if (typeof decoded === "object" && decoded.id) {
            const user = await User.findById(decoded.id).select("_id name email")
            if (user) {
                req.user = user
                next()
            } else {
                const error = new Error("Internal server error")
                res.status(500).json({ error: error.message })
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }

}