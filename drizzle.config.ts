import "@/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema/index.ts",
  dialect: "postgresql",
  out: "./src/drizzle/migrations",

  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
