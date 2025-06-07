import type { Role } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;

  role: Role;
  createdAt: Date;
  updateAt: Date;
}

export interface userDto {
  email: string;
  password: string;
}

export interface findUserByEmailDto {
  email: string;
}
