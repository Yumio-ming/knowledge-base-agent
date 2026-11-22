import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDB = globalThis as unknown as {
  conn: Pool | null;
};
const poll =
  globalForDB.conn ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

if (process.env.DATABASE_URL !== "production") {
  globalForDB.conn = poll;
}

export const db = drizzle({
  client: poll,
});
export type Database = typeof db;