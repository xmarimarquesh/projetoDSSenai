import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import dotenv from "dotenv";

dotenv.config();

class UserController {

    static async createUser(req: Request, res: Response) {
        const { name, email, username, password } = req.body;

        try {
            const user = await UserService.createUser(name, email, username, password);
            res.status(201).json(user);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const result = await UserService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: err.message });
        }
    }
}

export default UserController;
