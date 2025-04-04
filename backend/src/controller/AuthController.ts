import { Request, Response } from "express";
import { prisma } from '../lib/prisma.ts'
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

class AuthPrismaController {
    static async register(req: Request, res: Response): Promise<any> {

        const { name, email, password } = req.body;
        const passwordCrypt = crypto.AES.encrypt(password, process.env.SECRET as string).toString()

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordCrypt
            }
        })

        return res.status(201).json(user);

    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        
        if(!user)
            return res.status(400).send({ message: "Invalid Email or Password"});
        
        const secret = process.env.SECRET;
        var bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
        const passwordDecrypted = bytes.toString(crypto.enc.Utf8);
        
        if(password !== passwordDecrypted) {
            return new Error("Usuário e/ou senha inválidos");
        }

        if(secret) {
            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret,
                {
                    expiresIn: '2 days'
                }
            )
            return res.status(200).send({token: token});
        }
    }
}

export default AuthPrismaController;