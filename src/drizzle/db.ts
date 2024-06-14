"use server";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

import "@/drizzle/envConfig";

export const db = drizzle(sql, { schema });
