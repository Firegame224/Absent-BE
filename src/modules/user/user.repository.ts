import type { findUserByEmailDto, updateUserDto, userByIdDto, userCreateDto, usersByIdDto, userDto } from "../../common/types/user";
import prisma from "../../common/utils/prisma";

export class userRepository {
  async getAllUser() {
    return await prisma.user.findMany({});
  }

  async getUserOnly() {
    return await prisma.user.findMany({
      where : {
        role : "User"
      }
    });
  }

  async getUsers(dto: usersByIdDto) {
    return await prisma.user.findMany({
      where: {
        id: {
          in: dto.userId,
        },
      },
    });
  }

  async getUserById(dto: userByIdDto) {
    return await prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
      include: {
        absens: true,
      },
    });
  }

  async getUserByEmail(dto: findUserByEmailDto) {
    return await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
  }

  async createUser(dto: userCreateDto) {
    return await prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
      },
    });
  }

  async updateUser(dto: updateUserDto) {
    return await prisma.user.update({
      where: {
        id: dto.userId
      }, data: {
        email: dto.email,
        name: dto.name,
        role: dto.role
      }
    })
  }

  async deleteUser(userData: userByIdDto) {
    return await prisma.user.delete({
      where: {
        id: userData.userId,
      },
    });
  }

  async deleteUsers(dto: usersByIdDto) {
    return await prisma.user.deleteMany({
      where: {
        id: {
          in: dto.userId,
        },
      },
    });
  }
}
