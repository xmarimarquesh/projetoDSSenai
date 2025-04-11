// src/services/userService.ts
import { prisma } from '../lib/prisma.ts';
import crypto from "crypto-js";
import jwt from "jsonwebtoken";

export class HomeService {

  static async createPost(legenda: string, userId: number, foto: string) {

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      throw new Error("Já existe um usuário com esse email ou username.");
    }

    const passwordCrypt = crypto.AES.encrypt(password, process.env.SECRET as string).toString();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: passwordCrypt
      }
    });

    return user;
  }


}
