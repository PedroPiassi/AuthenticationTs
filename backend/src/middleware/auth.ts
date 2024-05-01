import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwtValidate";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: "Token not provided!" });

  const [, token] = authorization.split(" ");

  try {
    // const isValid = validateToken(token, process.env.JWT_SECRET);
    // console.log(isValid);
    // if (!isValid) throw new Error("Token invalid!");

    const decoded = verify(token, process.env.JWT_SECRET) as TokenPayload;
    const { id } = decoded;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid!" }); 
  }
}
