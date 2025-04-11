// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, username, password } = req.body;

    try {
      const user = await UserService.createUser(name, email, username, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findUserByEmail(email);

      if (!user) return res.status(400).json({ message: "Email inválido" });

      const bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
      const passwordDecrypted = bytes.toString(crypto.enc.Utf8);

      if (password !== passwordDecrypted) {
        return res.status(400).json({ message: "Senha inválida" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
        expiresIn: '2 days'
      });

      return res.status(200).json({ token });

    } catch (error) {
      return res.status(500).json({ message: "Erro interno", error });
    }
  }
}

export default UserController;
