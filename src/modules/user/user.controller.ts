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

  async getUserById(req: Request, res: Response, next: NextFunction) {
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

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.createUser({ ...req.body });
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
      const { token, role } = await this.service.signIn({ ...req.body });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200).json({
          status: {
            success: true,
            code: 200,
          },
          data: role,
          message: "signIn success",
        });
    } catch (error) {
      next(error);
    }
  }

  async logOut(_req: Request, res: Response, next: NextFunction) {
    try {
      res
        .clearCookie("token")
        .status(200).json({
          status: {
            success: true,
            code: 200,
          },
          message: "logout success",
        });
    } catch (error) {
      next(error);
    }
  }
}
