import type { NextFunction, Request, Response } from "express";
import type { userService } from "./user.service";

export class userController {
  constructor(private readonly service: userService) {}

  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAllUsers();
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
  async getuserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const existingUser = await this.service.getUserById({ id: user.id });
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "berhasil mendapatkan data user",
        data: existingUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.service.signUp({ email, password });
      res.status(201).json({
        status: {
          success: true,
          code: 201,
        },
        message: "signUp success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.signIn({ email, password });

      res.status(201).json({
        status: {
          success: true,
          code: 200,
        },
        message: "signIn success",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
