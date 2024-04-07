import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import * as schema from "@/data/db/schema"

export const db = drizzle(sql, { schema })
