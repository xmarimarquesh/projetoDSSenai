import { Request, Response } from 'express';
import { homeService } from '../services/homeService.ts';
import dotenv from "dotenv";

dotenv.config();

class HomeController {

    static async createHome(req: Request, res: Response) {
        const { name, email, username, password } = req.body;

        try {
            const home = await HomeService.createHome(name, email, username, password);
            res.status(201).json(home);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const result = await HomeService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ message: err.message });
        }
    }
}

export default HomeController;
