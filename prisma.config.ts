import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? env("DIRECT_URL"),
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'prisma/seed.js',
  },
});

