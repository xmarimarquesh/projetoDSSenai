// src/services/chatService.ts
import { prisma } from '../lib/prisma.ts';
import crypto from "crypto-js";

export class ChatService {
  static async createMensage(conteudo: string, enviadaEm: Date, remetenteId: number, destinatarioId: number) {

    const user = await prisma.chat.create({
        data: {
            conteudo,
            enviadaEm,
            remetenteId,
            destinatarioId,
        }
    })

    return user;
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}
                   