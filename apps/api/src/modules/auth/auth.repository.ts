import { db } from "../../prisma/db";

export async function findUserByEmail(email: string) {
  return await db.orm.public.User.where({
    email
  }).first();
}
