import express from "express";
import ChatController from "../controller/ChatController.ts";

const router = express.Router();

router.post("/mensagens", ChatController.sendMensage);

export default router;