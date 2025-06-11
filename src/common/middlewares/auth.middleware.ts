import type { NextFunction, Request, Response } from "express";
import Jwt, { JsonWebTokenError } from "jsonwebtoken";
import { userRepository } from "../../modules/user/user.repository";
import { httpException } from "../errors/exception";


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = await req.cookies["token"]

    if (!token) {
        throw new httpException(404, "Unauthorized")
    }

    const repository = new userRepository();

    try {
        const decoded = Jwt.decode(token!) as { id: string };

        const user = await repository.getUserById({ userId: decoded.id });

        if (!user) {
            throw new httpException(401, "Unauthorized");
        }

        (req as any).user = user;

        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new httpException(401, "Token Tidak Valid")
        }
        next(error);
    }
}