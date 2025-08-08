import type { Request, Response } from 'express';
import User from '../models/User';
import Project from '../models/Project';

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


    static getProjectTeam = async (req: Request, res: Response) => {
        const project = await Project.findById(req.params.projectId).populate('team', 'name email');
        res.json(req.project.team);
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

        if (req.project.team.some(team => team.toString() === user.id.toString())) {
            const error = new Error("User already in team");
            res.status(400).json({ error: error.message });
            return;
        }

        req.project.team.push(user.id);
        await req.project.save();
        res.send("user added to team successfully");
    }

    static removeMemberById = async (req: Request, res: Response) => {
        const { id } = req.body;
        // console.log(id);
        if (!req.project.team.some(team => team.toString() === id.toString())) {
            const error = new Error("User not in team");
            res.status(400).json({ error: error.message });
            return;
        }
        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== id.toString());
        await req.project.save();
        res.send("user removed from team successfully");
    }

}
