import type { NextFunction, Request, Response } from "express";
import { httpException } from "../errors/exception";

export async function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof httpException) {
    res.status(error.status).json({
      status: { success: false, code: error.status },
      message: error.message,
    });
  } else {
    res
      .status(500)
      .json({ status: { succes: false, code: 500 }, message: error.message });
  }
}
