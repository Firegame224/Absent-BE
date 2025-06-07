import type { NextFunction, Request, Response } from "express";
import { httpException } from "../errors/exception";

export async function adminMiddleware( req : Request, _res : Response, next : NextFunction ) {
    try {
        const user = ( req as any ).user
        
        if (!user || user.role !== "Admin") {
            throw new httpException(403 , "Anda bukan Admin boss")
        }

        next();
    } catch (error) {
        next(error);
    }
}