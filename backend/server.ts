import express from 'express';
import router from './src/routes/routes.ts'
import cors from 'cors';
import { Request } from "express";
import { WebSocketServer } from "ws";

// npm install node-fetch

const wss = new WebSocketServer({ port: 3000, host: "0.0.0.0" });

wss.on("connection", (ws) => {
  console.log("🟢 Novo cliente conectado!");

  ws.on("message", async (message) => {
    console.log(`📩 Mensagem recebida: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message.toString());
      }
    });

    try{
      const response = await fetch('http://localhost:4000/mensagens', { // ju aqui é o link que esá funcionando no routes
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem: message.toString() }) // ju, aqui ele manda o rep.body
      });

      const data = await response.json();
      console.log("📨 Enviado para HTTP com sucesso:", data);
    } catch (error) {
      console.error("❌ Erro ao enviar para HTTP:", error);
    }

  });

  ws.on("close", () => console.log("🔴 Cliente desconectado"));
});

console.log("🚀 Servidor WebSocket rodando na porta 3000...");

const app = express();
const port = 8080;
app.use(cors({origin:'*'}));
app.use(express.json()); 
router(app);

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));