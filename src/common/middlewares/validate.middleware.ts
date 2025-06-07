import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { httpException } from "../errors/exception";

export function validateMiddleware(schema: Joi.ObjectSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { error } = await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new httpException(
        400,
        error.details.map((err: Error) => err.message).join(", ")
      );
    }

    next();
  };
}
