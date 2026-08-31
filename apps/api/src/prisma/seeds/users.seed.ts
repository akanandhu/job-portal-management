import bcrypt from "bcrypt";
import { db } from "../db";

export async function seedUsers() {
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const userPassword = await bcrypt.hash("User@123", 12);

  const users = [
    {
      name: "Admin User",
      email: "admin@company.com",
      passwordHash: adminPassword,
      role: "ADMIN" as const,
    },
    {
      name: "Regular User",
      email: "user@company.com",
      passwordHash: userPassword,
      role: "USER" as const,
    },
  ];

  for (const user of users) {
    const existingUser = await db.orm.public.User.where({
      email: user.email,
    }).first();

    if (!existingUser) {
      await db.orm.public.User.create(user);
      console.log(`User with email ${user.email} created.`);
    } else {
      console.log(`User with email ${user.email} already exists.`);
    }
  }
}
