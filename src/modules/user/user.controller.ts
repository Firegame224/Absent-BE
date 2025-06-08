import type { NextFunction, Request, Response } from "express";
import type { userService } from "./user.service";

export class userController {
  constructor(private readonly service: userService) { }

  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAllUsers();
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Mendapatkan semua user",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getuserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const existingUser = await this.service.getUserById({ userId: user.id });
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil mendapatkan data user",
        data: existingUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await this.service.updateUser({ ...req.body });

      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Update success",
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedUser = await this.service.deleteUser({ ...req.body });

      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Delete success",
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.signUp({...req.body });
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
      const token = await this.service.signIn({ ...req.body });

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
