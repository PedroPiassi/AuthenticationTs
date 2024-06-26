import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
    async login (req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.json({ error: "User not found!" });

        const isValuePassword = await compare(password, user.password);
        if (!isValuePassword) return res.json({ error: "Password invalid!" });

        const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const { id, name } = user;

        return res.json({ user: { id, name, email }, token });
    }

    auth (req: Request, res: Response) {
        return res.json({ status: true });
    }
}