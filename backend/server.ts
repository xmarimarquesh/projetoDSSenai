import express from 'express';
import initRoutes from './src/routes/routes.ts'
import cors from 'cors'
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000, host: "0.0.0.0" });

wss.on("connection", (ws) => {
  console.log("🟢 Novo cliente conectado!");

  ws.on("message", (message) => {
    console.log(`📩 Mensagem recebida: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("🔴 Cliente desconectado"));
});

console.log("🚀 Servidor WebSocket rodando na porta 3000...");


const app = express();
const port = 8080;
app.use(cors({
    origin: '*'
}))

initRoutes(app)

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));

app.use(
    cors({
        origin: "http://localhost:3000", // Permite apenas requisições desta origem
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    })
);