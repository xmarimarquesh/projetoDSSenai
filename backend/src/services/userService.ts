// src/services/userService.ts
import { prisma } from '../lib/prisma.ts';
import crypto from "crypto-js";

export class UserService {
  static async createUser(name: string, email: string, username: string, password: string, fotoPerfil: string, capaPerfil: string) {
    const passwordCrypt = crypto.AES.encrypt(password, process.env.SECRET as string).toString();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: passwordCrypt,
        fotoPerfil,
        capaPerfil,
      }
    });

    return user;
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}
