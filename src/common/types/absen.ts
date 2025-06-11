import type { AbsenStatus, User } from "@prisma/client";


export interface userAbsen {
  user: User;
  userId: string;

  absenId: string;
  absen: Absen

  status: AbsenStatus;
}

export interface absenByIdDto {
  absenId: string
}

export interface Absen {
  id: string;
  userAbsens: userAbsen[];

  tanggal: Date;
}

export interface createAbsenDto {
  userData: User[];
  date: Date
}

export interface updateAbsenDto {
  absenId: string
  userId: string
  status: string
}

export interface updateAbsenTodayDto {
  absenId: string
  userId: string
  status: AbsenStatus
}

export interface absenByDateDto {
  date: Date
}

export interface deleteAbsenDto {
  absenId: string
  date: Date
}

export interface userAbsenTodayDto {
  userId: string
  absenId: string;
  date : Date;
}