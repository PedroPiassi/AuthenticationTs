import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class UserController {
    async index (req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json({ users })
    }
     
    async store (req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userExist = await prisma.user.findUnique({ where: { email } });
        if (userExist) return res.json({ error: "User exists!" });

        const passwordHash = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
        });

        return res.json({ user });
    }
}