"use server";

import { db } from "@/drizzle/db";
import { settingsTable } from "@/drizzle/schema";
import type { OrgId } from "@/types/Id";
import { eq } from "drizzle-orm";

export async function getSettings(orgId: OrgId) {
  return await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.orgId, orgId))
    .limit(1)
    .execute()
    .then((rows) => rows[0]);
}
