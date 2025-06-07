import { httpException } from "../../common/errors/exception";
import type { userRepository } from "./user.repository";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { userDto } from "../../common/types/user";

export class userService {
  constructor(private repository: userRepository) {}
  async getAllUsers() {
    const users = await this.repository.getAllUser();
    if (users.length === 0) {
      throw new httpException(404, "User not found");
    }

    return users;
  }
  async getUserById(dto: { id: string }) {
    const user = this.repository.getUserById({ id: dto.id });
    if(!user) {
        throw new httpException(404, "User not Found")
    }

    return user;
  }
  async signUp(dto: userDto) {
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

    return this.generateToken({ id: existingUser.id });
  }

  async generateToken(userData: { id: string }) {
    return Jwt.sign({ id: userData.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }
}
