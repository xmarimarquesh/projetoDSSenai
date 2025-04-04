import express from "express";
import UserController from "../controller/UserController.ts";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);

export default router;