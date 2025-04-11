import express from "express";
import UserController from "../controller/UserController.ts";

const router = express.Router();

router.get("/login", UserController.login);
router.post("/register", UserController.createUser);
router.get("/profile", UserController.getProfile)

export default router;