import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const enums = ["currency", "language", "category_type"];
  const tables = [
    "settings",
    "used_currencies",
    "budget",
    "default_budget",
    "budget_item",
    "category",
  ];
  for (const table of tables) {
    await db.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
  }
  for (const enumType of enums) {
    await db.query(`DROP TYPE IF EXISTS ${enumType};`);
  }
  return NextResponse.json({ message: "Tables dropped" });
}
