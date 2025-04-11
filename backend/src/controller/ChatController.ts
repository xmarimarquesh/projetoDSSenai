import { Request, Response } from 'express';
import { ChatService } from '../services/chatService.ts';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class ChatController {
  static async sendMensage(req: Request, res: Response) {
    const { mensagem } = req.body;
    const { idDestino } = req.params;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];

    try {

     const decoded = jwt.verify(token, 'seu_segredo_jwt') as { id: number };

     const remetenteId = decoded.id;

      const user = await ChatService.createMensage(mensagem, new Date(), remetenteId, parseInt(idDestino));
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar usuário', error });
    }
  }
}

export default ChatController;
