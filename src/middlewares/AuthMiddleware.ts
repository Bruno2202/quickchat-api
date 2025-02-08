import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization: string | undefined = req.headers.authorization;

        if (!authorization) {
            res.status(401).json({
                success: false,
                code: 401,
                message: "Token de autenticação não informado",
            });
            return;
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            res.status(401).json({
                success: false,
                code: 401,
                message: "Token inválido",
            });
            return;
        }

        jwt.verify(token, JWT_SECRET);

        next();
    } catch (error: any) {
        console.log(`Não foi possível autenticar sessão: ${error.message}`);

        res.status(401).json({
            success: false,
            code: 401,
            message: "Token inválido ou expirado",
        });
        return ;
    }
}
