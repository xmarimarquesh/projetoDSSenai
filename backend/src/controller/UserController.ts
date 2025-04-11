// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService.ts';
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { prisma } from '../lib/prisma.ts';

dotenv.config();

class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, username, password } = req.body;

    try {
      const user = await UserService.createUser(name, email, username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findUserByEmail(email);

      if (user) {
        const bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
        const passwordDecrypted = bytes.toString(crypto.enc.Utf8);
  
        if (password !== passwordDecrypted) {
          res.status(400).json({ message: "Senha inválida" });
        }
  
        const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
          expiresIn: '2 days'
        });
  
        res.status(200).json({ token });
      }
      
      res.status(400).json({ message: "Email inválido" });

    } catch (error) {
      res.status(500).json({ message: "Erro interno", error });
    }
  }

  static async getProfile(req: Request, res: Response) {
    const { id } = req.body;
    const usuario = await prisma.user.findUnique({ where: { id } })

    return usuario;
  }
}

export default UserController;
