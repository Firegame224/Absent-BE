import { AbsenStatus } from "@prisma/client";
import { httpException } from "../../common/errors/exception";
import { convertObject } from "../../common/helpers/absen";
import { createDate } from "../../common/helpers/date";
import { userRepository } from "../user/user.repository";
import { absenRepository } from "./absen.repository";
import type { userByIdDto } from "../../common/types/user";
import type { absenByIdDto, updateAbsenDto } from "../../common/types/absen";

export class absenService {
  constructor(
    private readonly absenRepository: absenRepository,
    private readonly userRepository: userRepository
  ) {}

  // Dapatkan semua absen
  async getAbsens() {
    const existingAbsen = await this.absenRepository.getAbsenUser();
    if (existingAbsen.length === 0) {
      throw new httpException(404, "Absen Not Found");
    }
    return convertObject(existingAbsen);
  }

  // Dapatkan Absen hari ini
  async getAbsenToday() {
    const date = createDate(new Date());
    const absenToday = await this.absenRepository.getAbsenToday({ date });

    if (!absenToday) {
      throw new httpException(404, "Belum ada absen hari ini");
    }

    return absenToday;
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
  async createAbsen() {
    const date = createDate(new Date());
    const absenToday = await this.absenRepository.getAbsenToday({ date });

    if (absenToday) {
      throw new httpException(409, "Absen sudah ada");
    }

    const existingUsers = await this.userRepository.getAllUser();

    if (existingUsers.length === 0) {
      throw new httpException(404, "User Not Found");
    }

    return this.absenRepository.createAbsenToday({
      userData: existingUsers,
      date,
    });
  }

  // User Absen Hari ini
  async AbsenToday(dto: updateAbsenDto ) {
    const date = createDate(new Date());
    
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
      absenId: existingAbsen?.id as string,
      userId: dto.userId,
    });

    if (isAbsenToday) {
      throw new httpException(409, "Anda sudah absen hari ini");
    }

    if (!existingAbsen) {
      throw new httpException(404, "Absen Not Found");
    }

    let absenStatus: AbsenStatus = "Alpha";

    if (dto.status === "Hadir") {
      absenStatus = "Hadir";
    }
    if (dto.status === "Izin") {
      absenStatus = "Izin";
    }
    if (dto.status === "Terlambat" || date > existingAbsen.tanggal) {
      absenStatus = "Terlambat";
    }

    const updatedAbsen = await this.absenRepository.updateAbsenToday({
      absenId: existingAbsen.id,
      userId: existingUser.id,
      status: absenStatus,
    });

    return updatedAbsen;
  }

  // Hapus absen hari ini
  async deleteAbsenToday(dto: absenByIdDto) {
    const date = createDate(new Date());
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
