import type { userDto } from "../../common/types/user";
import prisma from "../../common/utils/prisma";

export class userRepository {
  async getAllUser() {
    return await prisma.user.findMany({});
  }
  async getUserById(userData: { id: string }) {
    return await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
      include: {
        absens: true,
      },
    });
  }
  async getUserByEmail(userData: { email: string }) {
    return await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
  }
  async createUser(userData: userDto) {
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.email.split("@")[0],
      },
    });
  }
  async deleteUser(userData: { userId: string }) {
    return await prisma.user.delete({
      where: {
        id: userData.userId,
      },
    });
  }
}
