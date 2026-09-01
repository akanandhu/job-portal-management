import { db } from "../../prisma/db";
import type { CreateRefreshTokenI } from "./auth.types";

export async function findUserByEmail(email: string) {
  return await db.orm.public.User.where({
    email,
  }).first();
}

export async function findUserById(id: string) {
  return db.orm.public.User.where({
    id,
  }).first();
}

export async function createRefreshToken(data: CreateRefreshTokenI) {
  return db.orm.public.RefreshToken.create(data);
}

export async function findRefreshTokenByHash(tokenHash: string) {
  return db.orm.public.RefreshToken.where({
    tokenHash,
  }).first();
}
