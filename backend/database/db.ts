import { Pool, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import ws from "ws"
import * as schema from "./schema"


neonConfig.webSocketConstructor = ws;

if (!process.env.DB_URL) throw new Error("DB_URL varuable must be set.");


export const pool = new Pool({ connectionString: process.env.DB_URL, ssl: { rejectUnauthorized: false } });
export const db = drizzle({ client: pool, schema })