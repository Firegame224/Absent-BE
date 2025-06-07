import type { AbsenStatus } from "@prisma/client";
import type { User } from "./user";

export interface userAbsen {
  user: User;
  userId: string;

  absenId : string;
  absen : Absen

  status : AbsenStatus ;
}

export interface Absen {
  id: string;
  userAbsens: userAbsen[];

  tanggal: Date;
}
