import type { Request, Response } from 'express';
import User from '../models/User';

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body;

        //find user
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User not found");
            res.status(404).json({ error: error.message });
        }
        res.json(user)
    }

    static addMemberById = async (req: Request, res: Response) => {
        const { id } = req.body;
        console.log(id);

        //find user
        const user = await User.findById(id).select(id);

        if (!user) {
            const error = new Error("User not found");
            res.status(404).json({ error: error.message });
        }

        if(req.project.team.some(team => team.toString() === user.id.toString())) {
            const error = new Error("User already in team");
            res.status(400).json({ error: error.message });
            return;
        }

        req.project.team.push(user.id);
        await req.project.save();
        res.send("user added to team successfully");
    }

}
