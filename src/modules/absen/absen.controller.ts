import type { NextFunction, Request, Response } from "express";
import type { absenService } from "./absen.service";

export class absenController {
  constructor(private readonly service: absenService) {}
  // Dapatkan absen hari ini
  async getAbsenToday(_req: Request, res: Response, next: NextFunction) {
    try {
      const absenToday = await this.service.getAbsenToday();
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil mendapatkan data absen hari ini",
        data: absenToday,
      });
    } catch (error) {
      next(error);
    }
  }

  // Semua data absen untuk chart
  async getAllAbsen(_req: Request, res: Response, next: NextFunction) {
    try {
      const absens = await this.service.getAbsens();
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil mendapatkan data semua absen",
        data: absens,
      });
    } catch (error) {
      next(error);
    }
  }

  // Riwayat absen user
  async getAbsenUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const absenUser = await this.service.getAbsenUser({ userId: user.id });
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil mendapatkan data absen hari ini",
        data: absenUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Buat absen hari ini
  async createAbsen(_req: Request, res: Response, next: NextFunction) {
    try {
      const createdAbsen = await this.service.createAbsen();
      res.status(200).json({
        status: {
          success: true,
          code: 201,
        },
        message: "Berhasil membuat absen hari ini",
        data: createdAbsen,
      });
    } catch (error) {
      next(error);
    }
  }

    // User Absen hari ini
  async absenUserToday(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, absenId } = req.body;
      const user = (req as any).user;
      const updatedAbsen = await this.service.AbsenToday({
        absenId,
        status,
        userId: user.id,
      });
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil absen hari ini",
        data: updatedAbsen,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Hapus absen hari ini
  async deleteAbsenToday(req: Request, res: Response, next: NextFunction) {
    try {
      const { absenId } = req.params;
      const deletedAbsen = await this.service.deleteAbsenToday({
        absenId: absenId as string,
      });
      res.status(200).json({
        status: {
          success: true,
          code: 200,
        },
        message: "Berhasil menghapus absen hari ini",
        data: deletedAbsen,
      });
    } catch (error) {
      next(error);
    }
  }
}
