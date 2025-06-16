import prisma from "../../common/utils/prisma";
import type { absenByDateDto, absenByIdDto, createAbsenDto, deleteAbsenDto, updateAbsenTodayDto, userAbsenTodayDto } from "../../common/types/absen";
import type { userByIdDto } from "../../common/types/user";

export class absenRepository {
  async getAbsenById(dto: absenByIdDto) {
    return await prisma.absens.findUnique({
      where: {
        id: dto.absenId,
      },
    });
  }

  async getAbsenToday(dto: absenByDateDto) {
    return await prisma.absens.findUnique({
      where: {
        tanggal: dto.date,
      },
      include: {
        userAbsens: true
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
      }, orderBy: {
        absen: {
          tanggal: "asc"
        }
      }
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

  async getUserAbsenToday(dto: { userId: string, date: Date }) {
    return await prisma.absenUser.findFirst({
      where: {
        userId: dto.userId,
        absen: {
          tanggal: dto.date
        }
      }
    });
  }

  async getAllUserAbsenTodays(dto: { date: Date }) {
    return await prisma.absenUser.findMany({
      where: {
        absen: {
          tanggal: dto.date
        }
      }, include: {
        absen: {
          select: {
            tanggal: true
          }
        }
      }
    })
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
