import prisma from "../../common/utils/prisma";
import type { absenByDateDto, createAbsenDto, deleteAbsenDto, updateAbsenTodayDto, userAbsenTodayDto } from "../../common/types/absen";
import type { userByIdDto } from "../../common/types/user";

export class absenRepository {
  async getAbsenById(dto: { absenId: string }) {
    return await prisma.absens.findUnique({
      where: {
        id: dto.absenId,
      },
    });
  }

  async getAbsenToday(dto: absenByDateDto) {
    return await prisma.absens.findFirst({
      where: {
        tanggal: dto.date,
      },
      include : {
        userAbsens :true
      }
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

  async getAbsenUserToday(dto: userAbsenTodayDto) {
    return await prisma.absenUser.findUnique({
      where: {
        absenId_userId: {
          absenId: dto.absenId,
          userId: dto.userId,
        },
        absen_status: true,
      },
    });
  }

  async getAbsenUserById(dto: userByIdDto) {
    return await prisma.absenUser.findMany({
      where: {
        userId: dto.userId,
      },
      include: {
        absen: true,
        user: true,
      },
    });
  }

  async createAbsenToday(dto: createAbsenDto) {
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

  async updateAbsenToday(dto: updateAbsenTodayDto) {
    return await prisma.absenUser.update({
      where: {
        absenId_userId: {
          absenId: dto.absenId,
          userId: dto.userId,
        },
      },
      data: {
        absen_status: true,
        status: dto.status,
      },
    });
  }

  async deleteAbsenToday(dto: deleteAbsenDto) {
    return await prisma.absens.delete({
      where: {
        id: dto.absenId,
        tanggal: dto.date,
      },
    });
  }
}
