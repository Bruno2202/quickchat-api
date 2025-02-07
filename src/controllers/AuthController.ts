import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import AuthBll from "../bll/AuthBll";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export default class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { id, username } = req.body

            await AuthBll.login(id, username);

            const payload = { id, username };

            const token = jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.status(200).json({
                success: true,
                code: res.statusCode,
                token
            });
        } catch (error: any) {
            console.log(`Não foi possível realizar login: ${error.message}`);
            switch (error.message) {
                case "ID usuário inválido":
                case "Nome inválido":
                    res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: error.message
                    });
                    break;

                default:
                    res.status(500).json({
                        success: false,
                        code: res.statusCode,
                        message: error.message
                    });
                    break;
            }
        }
    }
}