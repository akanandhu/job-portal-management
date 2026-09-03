import { db } from "../db";
import { seedJobs } from "./jobs.seed";
import { seedUsers } from "./users.seed";

async function main() {
  console.log("Seeding database...");

  await seedUsers();
  await seedJobs();

  console.log("Seeding completed.");
}

main()
  .catch((err) => {
    console.error("Error occurred while seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
