import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./database/schema.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL!
    }
});