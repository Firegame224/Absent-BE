import { httpException } from "../../common/errors/exception";
import type { userRepository } from "./user.repository";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { deleteUsersDto, updateUserDto, userByIdDto, userDto } from "../../common/types/user";
import type { Role } from "@prisma/client";
import { roleUser } from "../../common/helpers/role";

export class userService {
  constructor(private repository: userRepository) { }
  async getAllUsers() {
    const users = await this.repository.getAllUser();
    if (users.length === 0) {
      throw new httpException(404, "User not found");
    }

    return users;
  }

  async getUserById(dto: userByIdDto) {
    const user = this.repository.getUserById({ userId: dto.userId });
    if (!user) {
      throw new httpException(404, "User not Found");
    }

    return user;
  }

  async createUser(dto: userDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const existingUser = await this.repository.getUserByEmail({
      email: dto.email,
    });

    if (existingUser) {
      throw new httpException(409, "Email already exist");
    }

    return await this.repository.createUser({
      email: dto.email,
      password: hashedPassword,
      name: dto.email.split("@")[0] as string
    });
  }

  async signIn(dto: userDto) {
    const existingUser = await this.repository.getUserByEmail({
      email: dto.email,
    });

    if (!existingUser) {
      throw new httpException(404, "Email tidak ditemukan");
    }

    const checkPassword = await bcrypt.compare(
      dto.password,
      existingUser.password as string
    );

    if (!checkPassword) {
      throw new httpException(400, "Password salah");
    }

    return { token: this.generateToken({ userId: existingUser.id }), role: existingUser.role };
  }

  async updateUser(dto: updateUserDto) {
    const existingUser = await this.repository.getUserById({ userId: dto.userId })

    const role = roleUser(dto.role);

    if (!existingUser) {
      throw new httpException(404, "user not found")
    }

    return await this.repository.updateUser({ email: dto.email || existingUser.email, name: dto.name || existingUser.name, role: role || existingUser.role, userId: dto.userId })
  }

  async deleteUser(dto: deleteUsersDto) {
    if (dto.userId instanceof Array) {
      const existingUsers = await this.repository.getUsers({
        userId: dto.userId,
      });

      if (existingUsers.length === 0) {
        throw new httpException(404, "User Tidak ditemukan");
      }

      return await this.repository.deleteUsers({ userId: dto.userId });
    }

    const existingUser = await this.repository.getUserById({ userId: dto.userId });

    if (!existingUser) {
      throw new httpException(404, "User not found")
    }

    return await this.repository.deleteUser({ userId: dto.userId })
  }

  async generateToken(dto: userByIdDto) {
    return Jwt.sign({ id: dto.userId }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  }
}
