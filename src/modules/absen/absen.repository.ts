import type { AbsenStatus, User } from "@prisma/client";
import prisma from "../../common/utils/prisma";
import type { userAbsen } from "../../common/types/absen";

export class absenRepository {
  async getAbsenById(dto: { absenId: string }) {
    return await prisma.absens.findUnique({
      where: {
        id: dto.absenId,
      },
    });
  }

  async getAbsenToday(dto: { date: Date }) {
    return await prisma.absens.findFirst({
      where: {
        tanggal : dto.date
      },
    });
  }

  async getAbsenUser() {
    return await prisma.absenUser.findMany({
      include: {
        absen: {
          select: {
            tanggal: true,
          },
        },
      },
    });
  }

  async getAbsenUserById(dto: { userId: string }) {
    return await prisma.absenUser.findMany({
      where: {
        userId: dto.userId,
      },
      include: {
        absen: true,
      },
    });
  }

  async createAbsen(dto: { userData: User[]; date: Date }) {
    return await prisma.absens.create({
      data: {
        tanggal: dto.date,
        userAbsens: {
          create: dto.userData.map((user) => ({
            user: {
              connect: {
                id: user.id,
              },
            },
          })),
        },
      },
    });
  }
  
  async updateUserAbsen(dto: { userId : string , absenId : string , status : AbsenStatus }) {
    return await prisma.absenUser.update({
      where: {
        userId: dto.userId,
        absenId: dto.absenId,
      },
      data: {
        status: dto.status,
      },
    });
  }

  async deleteAbsenToday(dto: { absenId: string; date: Date }) {
    return await prisma.absens.delete({
      where: {
        id: dto.absenId,
        tanggal: dto.date,
      },
    });
  }
}
