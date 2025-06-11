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

export interface userByIdDto {
  userId: string
}

export interface usersByIdDto {
  userId: string[]
}

export interface userCreateDto {
  email: string;
  password: string;
  name: string;
}

export interface userDto {
  email: string;
  password: string;
}

export interface findUserByEmailDto {
  email: string;
}

export interface updateUserDto {
  userId: string,
  email: string,
  name: string | null,
  role: Role
}

export interface deleteUsersDto {
  userId: string | []
}