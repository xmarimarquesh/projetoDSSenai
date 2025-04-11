// src/services/userService.ts
import { prisma } from '../lib/prisma.ts';
import crypto from "crypto-js";
import jwt from "jsonwebtoken";

export class UserService {

  static async createUser(name: string, email: string, username: string, password: string) {

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

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Email inválido");
    }

    const bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
    const passwordDecrypted = bytes.toString(crypto.enc.Utf8);

    if (password !== passwordDecrypted) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
      expiresIn: '2 days'
    });

    return { token };
  }

  static async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}
