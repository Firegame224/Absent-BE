import { AbsenStatus } from "@prisma/client";
import { httpException } from "../../common/errors/exception";
import { convertObject, convertObjects } from "../../common/helpers/absen";
import { userRepository } from "../user/user.repository";
import { absenRepository } from "./absen.repository";
import type { userByIdDto } from "../../common/types/user";
import type { absenByIdDto, updateAbsenDto } from "../../common/types/absen";
import { date } from "../../common/constant/date";
import { absenStatus } from "../../common/helpers/status";
import { createDate } from "../../common/helpers/date";

export class absenService {
  constructor(
    private readonly absenRepository: absenRepository,
    private readonly userRepository: userRepository
  ) { }

  // Dapatkan semua absen
  async getAbsens() {
    const existingAbsen = await this.absenRepository.getAbsenUser();

    if (existingAbsen.length === 0) {
      throw new httpException(404, "Absen Not Found");
    }

    return convertObjects(existingAbsen);
  }

  // Dapatkan absen user hari ini untuk data charts
  async getAllAbsenUserToday() {
    const date = createDate(new Date())
    const existingAbsenToday = await this.absenRepository.getAbsenToday({ date })

    if (!existingAbsenToday) {
      throw new httpException(404, "Absen Hari ini belum ada")
    }

    const existingUserAbsenToday = await this.absenRepository.getAllUserAbsenTodays({ date })

    if (existingUserAbsenToday.length === 0) {
      throw new httpException(404, "Absen Hari ini tidak ada")
    }

    return existingUserAbsenToday
  }

  // Dapatkan Absen hari ini
  async getAbsenToday() {
    const absenToday = await this.absenRepository.getAbsenToday({ date });

    if (!absenToday) {
      throw new httpException(404, "Belum ada absen hari ini");
    }

    return absenToday;
  }

  async getUserAbsenToday(dto: userByIdDto) {
    const existingUser = await this.userRepository.getUserById({
      userId: dto.userId,
    });

    if (!existingUser) {
      throw new httpException(404, "User not Found");
    }

    const Absen = await this.absenRepository.getUserAbsenToday({
      userId: dto.userId,
      date
    });

    if (!Absen) {
      throw new httpException(404, "Absen not Found");
    }
    return Absen;
  }
  // Dapatkan data absen berdasarkan id
  async getAbsenById(dto: absenByIdDto) {
    const existingAbsen = await this.absenRepository.getAbsenById({ absenId: dto.absenId });

    if (!existingAbsen) {
      throw new httpException(404, "Absen not found");
    }

    return existingAbsen;
  }

  // Dapatkan riwayat absen user
  async getAbsenUser(dto: userByIdDto) {
    const existingUser = await this.userRepository.getUserById({
      userId: dto.userId,
    });

    if (!existingUser) {
      throw new httpException(404, "User not Found");
    }

    const Absens = await this.absenRepository.getAbsenUserById({
      userId: dto.userId,
    });

    if (Absens.length === 0) {
      throw new httpException(404, "User not Found");
    }
    return Absens;
  }

  // Buat absen hari ini
  async createAbsenToday() {
    const absenToday = await this.absenRepository.getAbsenToday({ date });

    if (absenToday) {
      throw new httpException(409, "Absen hari ini sudah ada");
    }

    const existingUsers = await this.userRepository.getUserOnly();

    if (existingUsers.length === 0) {
      throw new httpException(404, "User Not Found");
    }

    return this.absenRepository.createAbsenToday({
      userData: existingUsers,
      date,
    });
  }

  // User Absen Hari ini
  async AbsenToday(dto: updateAbsenDto) {
    const existingUser = await this.userRepository.getUserById({
      userId: dto.userId,
    });

    if (!existingUser) {
      throw new httpException(404, "User Not Found");
    }

    const existingAbsen = await this.absenRepository.getAbsenById({
      absenId: dto.absenId,
    });

    const isAbsenToday = await this.absenRepository.getAbsenUserToday({
      absenId: existingAbsen?.id!,
      userId: dto.userId,
      date
    });

    if (isAbsenToday) {
      throw new httpException(409, "Anda sudah absen hari ini");
    }

    if (!existingAbsen) {
      throw new httpException(404, "Absen Not Found");
    }

    const status = absenStatus(dto.status, existingAbsen.tanggal)

    const updatedAbsen = await this.absenRepository.updateAbsenToday({
      absenId: existingAbsen.id,
      userId: existingUser.id,
      status: status,
    });

    return updatedAbsen;
  }

  // Hapus absen hari ini
  async deleteAbsenToday(dto: absenByIdDto) {
    const existingAbsen = await this.absenRepository.getAbsenById({
      absenId: dto.absenId,
    });

    if (!existingAbsen) {
      throw new httpException(404, "Absen Not Found");
    }

    return await this.absenRepository.deleteAbsenToday({
      absenId: dto.absenId,
      date,
    });
  }
}
